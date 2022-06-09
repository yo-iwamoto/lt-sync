import { functions } from '../../lib/firebase-functions';
import { app } from '../../lib/firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import { pdfToPng } from 'pdf-to-png-converter';
import { getFirestore } from 'firebase-admin/firestore';
import os from 'os';

export const generatePngFromPdf = functions
  .region('asia-northeast1')
  .storage.object()
  .onFinalize(async ({ name }) => {
    const bucket = getStorage(app).bucket('gs://monju-351211.appspot.com');
    const firestore = getFirestore(app);

    if (name === undefined) {
      throw new Error();
    }

    const taskId = getTaskIdFromFileName(name);

    try {
      // 作成されたファイルを /tmp にダウンロード
      const [file] = await bucket.file(name).get();
      // const downloadPath = path.join(os.tmpdir(), file.name);
      const [buffer] = await file.download();

      // PDF を png に変換
      const generatedImages = await pdfToPng(buffer, {
        outputFolder: os.tmpdir(),
      });

      // png をアップロード
      const dir = `generated/${taskId}`;
      await Promise.all(
        generatedImages.map((image, index) =>
          bucket.upload(image.path, {
            destination: `${dir}/${index}.png`,
          })
        )
      );

      // タスクのドキュメントでステータスを succeeded に更新する
      await firestore.collection('generateImagesTasks').doc(taskId).update({
        status: 'succeeded',
      });
    } catch (_) {
      // タスクのドキュメントでステータスを failed に更新する
      await firestore.collection('generateImagesTasks').doc(taskId).update({
        status: 'failed',
      });
    }
  });

const getTaskIdFromFileName = (name: string) => name.split('/').slice(-1)[0].split('.')[0];
