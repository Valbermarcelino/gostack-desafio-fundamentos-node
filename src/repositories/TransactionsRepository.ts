import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    /*var lista = [];
    lista.push(valor);*/

    /*function agruparPor(objetoArray: Transaction[], propriedade: 'income' | 'outcome') {
      return objetoArray.reduce(function (acc, obj) {
        let key = obj[propriedade]; //obj.type
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }*/

    //const balance = this.transactions.reduce(
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
          default:
            break;
        }

        return accumulator;
      }, { //valor inicial/já faz o js ententer formato do accumulator
        income: 0,
        outcome: 0,
        total: 0,
      }
    )

    var total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
