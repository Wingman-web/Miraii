// Temporary debug endpoint removed. No-op to avoid accidental logging.
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ ok: false }, { status: 410 })
}
