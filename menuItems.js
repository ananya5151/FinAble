import {book, dashboard, expenses, transactions, trend} from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Financial Resources",
        icon: transactions,
        link: "https://www.nationaldisabilityinstitute.org/financial-resilience-center/housing-and-food/",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Government Schemes and More",
        icon: book, 
        link: "http://127.0.0.1:5500/index.html",
    },
    
];
