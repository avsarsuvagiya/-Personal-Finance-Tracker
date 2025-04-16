import React from 'react';

const TransicationList = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="container mt-4">
      <h2 className="my-3">Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((item) => (
          <div key={item.id} className="card mb-3 p-3 shadow-sm">
            <div className="row d-flex align-items-center">
              <div className="my-1 col-lg-2 col-6"><strong>Amount:</strong> ₹{item.amount}</div>
              <div className="my-1 col-lg-2 col-6"><strong>Description:</strong> {item.description}</div>
              <div className="my-1 col-lg-2 col-6"><strong>Category:</strong> {item.category}</div>
              <div className="my-1 col-lg-2 col-6"><strong>Type:</strong> {item.type}</div>
              <div className="my-1 col-lg-2 col-6"><strong>Date:</strong> {item.date}</div>
              <div className="my-1 col-lg-2 col-6 d-flex">
                <button
                  className="btn btn-success btn-sm mx-2"
                  onClick={() => onEdit(item.id)} // Pass the transaction id to edit
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item.id)} // Pass the transaction id to delete
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

export default TransicationList;
