import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function ExpenseForm() {
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    }

    const handleDateChange = date => {
        setInputState({ ...inputState, date });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2000/api/expenses/add', inputState);
            console.log(response.data); 
            
        } catch (error) {
            console.error('Error adding expense:', error);
            
        }
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {/* Input fields for expense details */}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit"><b>ADD EXPENSE</b></button>
            </div>
        </ExpenseFormStyled>
    );
}


const ExpenseFormStyled = styled.form`
      display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 10px;
        border: 5px solid darkgreen;
        background: beige;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: black;
        &::placeholder{
            color: black;
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: black;
            &:focus, &:active{
                color: black;
            }
        }
    }

    .submit-btn {
    button {
        background-color: var(--color-accent);
        color: white;
        border: none;
        padding: 0.8rem 1.6rem;
        border-radius: 30px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var(--color-green);
        }

        &:focus {
            outline: none;
        }
    }
}

`;

export default ExpenseForm;
