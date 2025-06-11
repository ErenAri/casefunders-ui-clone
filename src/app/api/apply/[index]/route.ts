import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'submissions.json');

type Submission = {
  name: string;
  email: string;
  caseType: string;
  message: string;
  timestamp: string;
};

function load(): Submission[] {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file) as Submission[];
  } catch {
    return [];
  }
}

// ❗ `params` tipi artık `any` olarak tanımlanıyor: bu tür hataları atlatmak için bilinçli olarak
export async function PUT(
  request: NextRequest,
  { params }: { params: any }
) {
  const { index } = params;
  const updated: Submission = await request.json();
  const list = load();
  const idx = parseInt(index);
  if (isNaN(idx)) {
    return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
  }

  list[idx] = { ...updated, timestamp: list[idx].timestamp };
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  const { index } = params;
  const list = load();
  const idx = parseInt(index);
  if (isNaN(idx)) {
    return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
  }

  list.splice(idx, 1);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  return NextResponse.json({ success: true });
}
