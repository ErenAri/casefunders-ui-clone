'use server';

import dotenv from 'dotenv';
import path from 'path';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

// 📦 .env.local dosyasını elle yükle
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const filePath = path.join(process.cwd(), 'submissions.json');

export async function POST(request: Request) {
  const data = await request.json();

  // ✅ Anahtar yüklendi mi test et
  console.log('✅ RESEND_API_KEY:', process.env.RESEND_API_KEY);

  let submissions = [];
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    submissions = JSON.parse(file);
  } catch {
    submissions = [];
  }

  const newEntry = { ...data, timestamp: new Date().toISOString() };
  submissions.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: 'New Case Submission',
      html: `
        <h2>New Case Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Case Type:</strong> ${data.caseType}</p>
        <p><strong>Message:</strong><br>${data.message}</p>
      `,
    });
  } catch (error) {
    console.error('Email send error:', error);
  }

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    const submissions = JSON.parse(file);
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
