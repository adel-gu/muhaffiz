import { NextResponse } from 'next/server';
import quranClient from '@/lib/quran-foundation-api';

export async function GET() {
  try {
    const chapters = await quranClient.chapters.findAll();

    return NextResponse.json({
      chapters,
    });
  } catch (error: unknown) {
    console.error('API Route Error [/api/chapters]:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters', details: errorMessage },
      { status: 500 },
    );
  }
}
