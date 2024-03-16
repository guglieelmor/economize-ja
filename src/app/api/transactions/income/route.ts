import { NextRequest, NextResponse } from 'next/server';

import incomeController from '@/database/controllers/IncomeController';
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
      const income = await incomeController.store(query);
      if (income) {
        return NextResponse.json({
          data: income
        });
      }
    }
    return NextResponse.json({ status: 0, message: 'Failed to add a income' });
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
        const data = await incomeController.show(id);
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
      const deleted = await incomeController.deleteById(data, userId);
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
      const income = await incomeController.updateIncome(userId, body.data);
      if (income) {
        return NextResponse.json({
          status: 1,
          message: 'Updated with success!',
          income
        });
      }
    }
    return NextResponse.json({
      status: 0,
      message: 'Failed to update a income'
    });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
