import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateForm from './components/CreateForm';
import { useEffect, useState } from 'react';
import TransicationList from './components/TransicationList';
import BalanceDisplay from './components/BalanceDisplay';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editableTransaction, setEditableTransaction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updated);
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditableTransaction(transactionToEdit);
  };

  const handleUpdate = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setEditableTransaction(null);
  };

  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <>
      <div className={darkMode ? 'app dark-mode bg-dark text-light min-vh-100 ' : 'app bg-light text-dark min-vh-100 '}>
        <div className="form-check form-switch position-absolute top-0 end-0 me-3 mt-1 ">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label " htmlFor="flexSwitchCheckDefault">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </label>

        </div>

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
      </div>
    </>

  );
}

export default App;
