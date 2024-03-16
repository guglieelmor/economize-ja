import { NextRequest, NextResponse } from 'next/server';

import goalController from '@/database/controllers/goalController';
import tokenController from '@/database/controllers/TokenController';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }

    const res = await tokenController.validToken(token);

    if (res && res.status == 1) {
      const { data } = await request.json();
      const query = { user: res.userData?.id, ...data };
      const goal = await goalController.store(query);
      if (goal) {
        return NextResponse.json({
          data: goal
        });
      }
    }
    return NextResponse.json({ status: 0, message: 'Failed to add a goal' });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }

    const res = await tokenController.validToken(token);
    if (res && res.status == 1) {
      const id = res.userData?.id;
      if (id) {
        const data = await goalController.show(id);
        return NextResponse.json({ status: 1, data });
      }
    }
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }

    const res = await tokenController.validToken(token);
    if (res && res.status == 1) {
      const userId = res.userData?.id;
      const { data } = await request.json();
      const deleted = await goalController.deleteById(data, userId);
      return NextResponse.json({ status: 1, data: deleted });
    }
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }

    const res = await tokenController.validToken(token);
    if (res && res.status == 1) {
      const userId = res.userData?.id;
      const body = await request.json();
      const goal = await goalController.update(userId, body.data);
      if (goal) {
        return NextResponse.json({
          status: 1,
          message: 'Updated with success!',
          goal
        });
      }
    }
    return NextResponse.json({
      status: 0,
      message: 'Failed to update a goal'
    });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
