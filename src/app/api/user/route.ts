import { NextRequest, NextResponse } from 'next/server';

import tokenController from '@/database/controllers/TokenController';
import userController from '@/database/controllers/UserController';
import { User } from '@/database/schemas/UserSchema';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'node:crypto'

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const { fullname, password, email } = data;
    const user = await userController.createUser({
      fullname,
      password,
      email
    });
    if (user) {
      return NextResponse.json(user);
    }
    return NextResponse.json({ status: 0, message: 'Failed to create a user' });
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
      const user = await userController.showUser();
      return NextResponse.json(user);
    }
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try{
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token == 'undefined' || token == undefined) {
      return NextResponse.json({ status: 0, message: 'Token invalid' });
    }
    const formData = await request.formData();
    const _id = formData.get('_id') as string;
    const avatar = formData.get('avatar');
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;

    const dataExpenseCategories = formData.getAll('expenseCategories');
    const categoryExpense = dataExpenseCategories[0] as string;
    const expenseCategories = JSON.parse(categoryExpense) as {expenseCategory: string}[];

    const dataIncomeCategories = formData.getAll('incomeCategories');
    const categoryIncome = dataIncomeCategories[0] as string;
    const incomeCategories = JSON.parse(categoryIncome) as {incomeCategory: string}[];

    const res = await tokenController.validToken(token);

    let updateUser;

    const user = await User.findById(_id);
    if (res && res.status == 1 && res.userData?.id == _id) {
      const query = {_id, fullname, email, expenseCategories, incomeCategories};
      if(avatar && avatar !== 'null'){
        const avatarUUID = randomUUID()

        const { data: deleteData } = await supabase
        .storage
        .from('poupa-mais')
        .remove([`${user?.avatar}`]);

        const { data: uploadData } = await supabase
        .storage
        .from('poupa-mais')
        .upload(`avatars/${avatarUUID}`, avatar, {
          cacheControl: '3600',
          upsert: false
        })

        console.log(deleteData);

        if(uploadData){
            const data = {...query, avatar: uploadData.path};
            updateUser = await userController.updateUser(data);
        }
      }else{
        updateUser = await userController.updateUser(query);
      }
      return NextResponse.json(updateUser);
   }
   return NextResponse.json(res);
  }catch(e){
    return NextResponse.json({message: e});
  }
}
