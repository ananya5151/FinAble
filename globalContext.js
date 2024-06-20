import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:2000/api/";


const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}incomes/add`, income);
            getIncomes(); // Fetch updated incomes
        } catch (error) {
            setError('Failed to add income. Please try again.');
            console.error('Error adding income:', error);
        }
    };

    // Fetch incomes from the server
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}incomes/list`);
            setIncomes(response.data);
        } catch (error) {
            setError('Failed to fetch incomes. Please try again.');
            console.error('Error fetching incomes:', error);
        }
    };

    
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}incomes/delete/${id}`);
            getIncomes(); 
        } catch (error) {
            setError('Failed to delete income. Please try again.'); 
            console.error('Error deleting income:', error);
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}expenses/add`, expense);
            getExpenses();
        } catch (error) {
            setError('Failed to add expense. Please try again.'); 
            console.error('Error adding expense:', error);
        }
    };

    
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}expenses`);
            setExpenses(response.data);
        } catch (error) {
            setError('Failed to fetch expenses. Please try again.'); 
            console.error('Error fetching expenses:', error);
        }
    };

    
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}expenses/delete/${id}`);
            getExpenses(); 
        } catch (error) {
            setError('Failed to delete expense. Please try again.'); 
            console.error('Error deleting expense:', error);
        }
    };

    
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
