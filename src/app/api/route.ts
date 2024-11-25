import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ grocApiKey: process.env.GROC_API_KEY });
}
