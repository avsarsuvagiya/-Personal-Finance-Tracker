import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateForm from './components/CreateForm';
import { useEffect, useState } from 'react';
import TransicationList from './components/TransicationList';
import BalanceDisplay from './components/BalanceDisplay';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editableTransaction, setEditableTransaction] = useState(null);

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

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]); // Generate a unique ID
  };

  // Handle delete by id
  const handleDelete = (id) => {
    const updated = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updated);
  };

  // Handle edit: set the editable transaction
  const handleEdit = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditableTransaction(transactionToEdit);
  };

  // Handle update for edited transaction
  const handleUpdate = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setEditableTransaction(null); // Reset editableTransaction after updating
  };

  // Calculate total income and expenses
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      <BalanceDisplay balance={balance} />
      <CreateForm 
        onAdd={addTransaction} 
        onUpdate={handleUpdate} 
        editable={editableTransaction} 
      />
      <TransicationList 
        transactions={transactions} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </>
  );
}

export default App;
