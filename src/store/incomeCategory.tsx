import { FaStoreAlt } from 'react-icons/fa';
import { GiPiggyBank, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';

export const IncomeCategory: IncomeCategoryType = {
  Salário: <MdAttachMoney size={35} className="text-transaction" />,
  Freelance: <GiTakeMyMoney size={35} className="text-transaction" />,
  Investimentos: <GiPiggyBank size={35} className="text-transaction" />,
  Vendas: <FaStoreAlt size={35} className="text-transaction" />,
  Outros: <GiReceiveMoney size={35} className="text-transaction" />
};

export const IncomeCategoryOptions = Object.keys(IncomeCategory).map((key) => {
  return key;
});
type IncomeCategoryType = {
  [key: string]: JSX.Element;
};
