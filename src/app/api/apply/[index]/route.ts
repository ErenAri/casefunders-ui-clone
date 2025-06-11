import 'dotenv/config';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'submissions.json');

function load() {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  } catch {
    return [];
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { index: string } }
) {
  const list = load();
  const idx = parseInt(params.index);
  if (isNaN(idx)) return NextResponse.json({ error: 'Invalid index' }, { status: 400 });

  list.splice(idx, 1);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { index: string } }
) {
  const updated = await request.json();
  const list = load();
  const idx = parseInt(params.index);
  if (isNaN(idx)) return NextResponse.json({ error: 'Invalid index' }, { status: 400 });

  list[idx] = { ...updated, timestamp: list[idx].timestamp };
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  return NextResponse.json({ success: true });
}
