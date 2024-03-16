import { NextRequest, NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }
    const res = await tokenController.validToken(token);
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.json(e);
  }
}
