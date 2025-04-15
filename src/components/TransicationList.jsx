import React, { useState } from 'react';

const TransactionList = ({ transactions, onDelete }) => {
    const [filterData, setFilterData] = useState("All");

    const filteredTransactions = filterData === "All" ? transactions : transactions.filter(item => item.category === filterData);

    return (
        <div className="container mt-4">
            <select
                className="w-100 py-2"
                value={filterData}
                onChange={(e) => setFilterData(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
            </select>

            <h2 className="my-3">Transaction History</h2>

            {
                filteredTransactions.length === 0 ? (
                    <p>No transactions found.</p>
                ) : (
                    filteredTransactions.map((item, id) => (
                        <div key={id} className="card mb-3 p-3 shadow-sm">
                            <div className="row d-flex align-items-center ">
                                <div className="my-1 col-lg-2 col-6"><strong>Amount:</strong> ₹{item.amount}</div>
                                <div className="my-1 col-lg-3 col-6"><strong>Description:</strong> {item.description}</div>
                                <div className="my-1 col-lg-2 col-6"><strong>Category:</strong> {item.category}</div>
                                <div className="my-1 col-lg-2 col-6"><strong>Type:</strong> {item.type}</div>
                                <div className="my-1 col-lg-2 col-6"><strong>Date:</strong> {item.date}</div>
                                <div className='my-1 col-lg-1 col-6'>
                                    <button className='btn btn-danger btn-sm' onClick={() => onDelete(id)}>Delete</button>
                                </div>
                            </div>
                        </div>

                    ))
                )
            }
        </div>
    );
};

export default TransactionList;
