import { NextResponse } from 'next/server';

import userController from '@/database/controllers/UserController';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const user = await userController.showUser(id);
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
