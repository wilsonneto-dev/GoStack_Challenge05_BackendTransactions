import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = { income: 0, outcome: 0, total: 0 };

    const calculatedBalance = this.transactions.reduce<Balance>(
      (previewsBalance, currentTransaction) => {
        let { income, outcome } = previewsBalance;
        if (currentTransaction.type === 'outcome') {
          outcome += currentTransaction.value;
        } else {
          income += currentTransaction.value;
        }
        return { ...previewsBalance, outcome, income, total: income - outcome };
      },
      initialBalance,
    );

    return calculatedBalance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
