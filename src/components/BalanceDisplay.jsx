import React from 'react'

const BalanceDisplay = ({ balance }) => (
    <div className="text-center my-3">
        <h2>Balance: ${balance.toFixed(2)}</h2>
    </div>
);

export default BalanceDisplay
