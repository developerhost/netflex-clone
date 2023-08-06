import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    });

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    // bcrypt.hashの意味とは、ハッシュ化するということです。
    const hashedPassword = await bcrypt.hash(password, 12);

    // ユーザーを作成する
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      }
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}