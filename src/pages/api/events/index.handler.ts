import { firestore } from '@/server/firebase';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({ code: 'method-not-allowed' });
  }

  const title = req.body.title as string;

  const event = await firestore()
    .collection('events')
    .add({ title })
    .then((ref) =>
      ref.get().then((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }))
    );

  res.json({ event });
};

export default handler;
