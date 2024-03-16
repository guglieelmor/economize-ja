'use client';

import { TransactionProps } from '../History';
import TransactionItem from '../TransactionItem';

export default function TransactionItems(props: {
  transactions: TransactionProps[] | undefined;
}) {
  const { transactions } = props;
  return (
    <div className="flex flex-col sm:w-full space-y-4">
      {transactions &&
        transactions.map((transaction: TransactionProps) => {
          return (
            <TransactionItem
              key={transaction._id}
              _id={transaction._id}
              amount={transaction.amount}
              category={transaction.category}
              date={transaction.date}
              description={transaction.description}
              title={transaction.title}
              type={transaction.type}
            />
          );
        })}
    </div>
  );
}
