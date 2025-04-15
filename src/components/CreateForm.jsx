import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const CreateForm = ({ onAdd }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: '',
        type: 'Income',
        date: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            ...formData,
            id: Date.now(),
            amount: parseFloat(formData.amount),
        };
        onAdd(newTransaction);
        setFormData({ amount: '', description: '', category: '', type: 'Income', date: '' });
        navigate('/TransicationList')
    };


    return (
        <div>
            <div className="form w-100 m-auto ">
                <h3 className='text-center  my-3'>Transactions Form</h3>
                <form className='w-50 m-auto my-3 border border-dark p-3' onSubmit={handleSubmit}>
                    <input name="amount" type="number" className='form-control my-2' placeholder="Amount" value={formData.amount} onChange={handleChange} />
                    <input name="description" className='form-control my-2' placeholder="Description" value={formData.description} onChange={handleChange} />
                    <input name="category" className='form-control my-2' placeholder="Category" value={formData.category} onChange={handleChange} />
                    <select name="type" value={formData.type} className='form-control my-2' onChange={handleChange}>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                    <input name="date" type="date" className='form-control my-2' value={formData.date} onChange={handleChange} />
                    <button type="submit" className='btn btn-primary w-100'>Add Transaction</button>
                    
                </form>
            </div>
        </div>
    )
}

export default CreateForm
