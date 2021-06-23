// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import {
  generateOrderedList,
  generateOrderedUniqueList,
  preprocessData,
} from '../../server/process-data';
import { IProcessDataResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProcessDataResponse>
) {
  try {
    await new Promise<void>((resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req, (err, fields, Files) => {
        if (err) {
          res.status(500);
          reject(err);
        }

        const file = Files.file as File;
        const fileContents = preprocessData(fs.readFileSync(file.path, 'utf8'));

        const orderedResult = generateOrderedList(fileContents);
        const uniqueOrderedResult = generateOrderedUniqueList(fileContents);

        res.status(200).json({ orderedResult, uniqueOrderedResult });
        resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
