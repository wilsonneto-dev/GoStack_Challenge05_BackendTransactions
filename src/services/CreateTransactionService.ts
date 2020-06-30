import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (transaction.value > total) {
        throw Error('Saldo insuficiente.');
      }
    }

    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
