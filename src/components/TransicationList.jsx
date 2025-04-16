import React, { useState } from 'react';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter transactions based on selected category
  const filteredTransactions = transactions.filter(item =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="container mt-4">
      {/* Filter Dropdown */}
      <select
        className="w-100 py-1 mb-3"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <h2 className="my-3">Transaction History</h2>

      {filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        filteredTransactions.map(item => (
          <div key={item.id} className="card mb-3 p-3 shadow-sm">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 my-1">
                <strong>Amount:</strong> ₹{item.amount}
              </div>
              <div className="col-12 col-md-6 col-lg-4 my-1">
                <strong>Description:</strong>{" "}
                {item.description.length > 80
                  ? item.description.substring(0, 50) + "…"
                  : item.description}
              </div>
              <div className="col-12 col-md-6 col-lg-4 my-1">
                <strong>Category:</strong> {item.category}
              </div>
              <div className="col-12 col-md-6 col-lg-4 my-1">
                <strong>Type:</strong> {item.type}
              </div>
              <div className="col-12 col-md-6 col-lg-4 my-1">
                <strong>Date:</strong> {item.date}
              </div>
              <div className="col-12 col-md-6 col-lg-4 my-1 d-flex justify-content-start justify-content-lg-end">
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

        ))
      )}
    </div>
  );
};

export default TransactionList;
