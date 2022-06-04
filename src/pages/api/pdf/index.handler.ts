import { pdfToPng } from 'pdf-to-png-converter';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const result = await pdfToPng('./test.pdf');

  res.json({ result });
};

export default handler;
