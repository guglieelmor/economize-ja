import { NextRequest, NextResponse } from 'next/server';

import expenseController from '@/database/controllers/ExpenseController';
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
      const expense = await expenseController.store(query);
      if (expense) {
        return NextResponse.json({
          data: expense
        });
      }
    }
    return NextResponse.json({ status: 0, message: 'Failed to add a expanse' });
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
        const data = await expenseController.show(id);
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
      const deleted = await expenseController.deleteById(data, userId);
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
      const { data } = await request.json();
      const expense = await expenseController.updateExpense(userId, data);
      if (expense) {
        return NextResponse.json({
          status: 1,
          message: 'Updated with success!',
          expense
        });
      }
    }
    return NextResponse.json({
      status: 0,
      message: 'Failed to update a expense'
    });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
