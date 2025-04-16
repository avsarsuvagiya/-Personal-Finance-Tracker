import React from 'react';
const BalanceDisplay = ({ balance }) => {
    return (
        <div>
            <h4 className="text-center balancedisplay">Balance: ₹ {balance.toFixed(2)}</h4>
        </div>
    );
};

export default BalanceDisplay;
