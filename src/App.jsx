import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateForm from './components/CreateForm';
import { useEffect, useState } from 'react';
import TransicationList from './components/TransicationList';
import BalanceDisplay from './components/BalanceDisplay';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  // Update localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);


  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };
  return (
    <>
      <BalanceDisplay balance={balance} />
      <CreateForm onAdd={addTransaction} />
      <TransicationList transactions={transactions} onDelete={handleDelete}/>

    </>
  );
}

export default App;
