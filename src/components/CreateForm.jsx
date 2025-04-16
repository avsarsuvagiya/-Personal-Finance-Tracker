
import React, { useState, useEffect } from 'react';

const CreateForm = ({ onAdd, onUpdate, editable}) => {
  const [formData, setFormData] = useState({amount: '', description: '', category: '', type: 'Income',date: '',});

  useEffect(() => {
    if (editable) {
      setFormData({amount: editable.amount, description: editable.description, category: editable.category, type: editable.type, date: editable.date, });
    }
  }, [editable]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...formData,
      id: editable ? editable.id : Date.now(), // Use existing ID for edit
    };

    if (editable) {
      onUpdate(newTransaction); // Update existing transaction
    } else {
      onAdd(newTransaction); // Add new transaction
    }

    setFormData({ amount: '', description: '', category: '', type: 'Income', date: '' });
  };


  return (
    <div className={`container `}>
      <h4 className="text-center my-3">{editable ? 'Edit Transaction' : 'Add Transaction'}</h4>
      <form className="my-3 border border-dark p-3 addtransactions" onSubmit={handleSubmit}>
        <input
          name="amount"
          type="number"
          className="form-control my-2"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          name="description"
          className="form-control my-2"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="category"
          className="form-control my-2"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <select
          name="type"
          value={formData.type}
          className="form-control my-2"
          onChange={handleChange}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          name="date"
          type="date"
          className="form-control my-2"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary w-100">
          {editable ? 'Update Transaction' : 'Add Transaction'}
        </button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setFormData({ amount: '', description: '', category: '', type: 'Income', date: '' })}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
