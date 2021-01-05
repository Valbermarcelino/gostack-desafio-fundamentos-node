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
    if(!['income', 'outcome'].includes(type)) { //conferindo se não tem o type tá errado
      throw new Error('Trasaction type is invalid');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value){ //condição pedida/regra de negócio
      throw new Error('You do not have enough balance');
    }
    
    const transaction = this.transactionsRepository.create({
      title, 
      value, 
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
