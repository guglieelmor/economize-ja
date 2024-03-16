import { AiFillBank, AiFillHome } from 'react-icons/ai';
import { FaCarSide } from 'react-icons/fa';
import { GiHealthNormal, GiPayMoney, GiWhiteBook } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { MdLocalGroceryStore, MdOutlineOndemandVideo } from 'react-icons/md';

export const ExpenseCategory: ExpenseCategoryType = {
  Moradia: <AiFillHome size={35} className="text-transaction" />,
  Alimentação: <MdLocalGroceryStore size={35} className="text-transaction" />,
  Assinaturas: (
    <MdOutlineOndemandVideo size={35} className="text-transaction" />
  ),
  Transporte: <FaCarSide size={35} className="text-transaction" />,
  Saúde: <GiHealthNormal size={35} className="text-transaction" />,
  Educação: <GiWhiteBook size={35} className="text-transaction" />,
  Dívidas: <AiFillBank size={35} className="text-transaction" />,
  Transações: <GrTransaction size={35} className="text-transaction" />,
  Outros: <GiPayMoney size={35} className="text-transaction" />
};

export const ExpenseCategoryOptions = Object.keys(ExpenseCategory).map(
  (key) => {
    return key;
  }
);
type ExpenseCategoryType = {
  [key: string]: JSX.Element;
};
