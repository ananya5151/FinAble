"use strict";


let recognition;
let speaking = false;


function speak(text) {
  speaking = true;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = () => {
    speaking = false;
    if (recognition) {
      recognition.start();
    }
  };
  speechSynthesis.speak(utterance);
}


function openContacts() {
  speak("Opening contacts. What is the name of the contact?");
}


function openGovernmentSchemes() {
  speak("Opening government schemes. Which government scheme would you like to read about?");
}


function startBudgetCalculation() {
  speak("Calculating budget. What is the transaction name?");
}


function startSpeechRecognition() {
  speak("Microphone turned on. What would you like to do?");
  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'en-US'; 


  recognition.onresult = function(event) {
    if (!speaking) {
      const transcript = event.results[0][0].transcript.toLowerCase(); 

      
      if (transcript.includes("turn off mic")) {
        
        recognition.stop();
        speak("Microphone turned off.");
      } else if (transcript.includes("open contacts")) {
        openContacts();
      } else if (transcript.includes("open government schemes")) {
        openGovernmentSchemes();
      } else if (transcript.includes("budget calculation")) {
        startBudgetCalculation();
      } else if (!document.getElementById('text').value.trim()) {
        
        document.getElementById('text').value = transcript;
        speak("What is the amount?");
      } else if (!document.getElementById('amount').value.trim()) {
      
        document.getElementById('amount').value = parseFloat(transcript);
      
        if (document.getElementById('text').value.trim() && document.getElementById('amount').value.trim()) {
          addTransaction();
        }
      } else {
      
        speak("What would you like to do?");
      }
    }
  };

  recognition.start(); 
}

function addTransaction() {
  const transactionName = document.getElementById('text').value.trim();
  const transactionAmount = parseFloat(document.getElementById('amount').value.trim());

  if (!transactionName || isNaN(transactionAmount)) {
    speak("Please provide both transaction name and amount.");
    return;
  }

  const transaction = {
    id: generateID(),
    text: transactionName,
    amount: transactionAmount
  };


  addTransactionDOM(transaction);

  
  speak("Transaction added successfully. What would you like to do next?");
  

  document.getElementById('text').value = '';
  document.getElementById('amount').value = '';
}


function addTransactionDOM(transaction) {
  
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');


  item.innerHTML =  `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;

 
  document.getElementById('list').appendChild(item);
}

/**
 * Generates a unique ID for the transaction. For now, simply generates the
 * exact millisecond the transaction was created.
 * @returns number that represents a unique ID
 */
function generateID(){
  return new Date().getTime();
}


document.getElementById('turn-on-mic').addEventListener('click', startSpeechRecognition);


function openDropdown() {
  document.getElementById("dropdown-content").classList.toggle("show");
}


const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/* Array of transactions found on the user's browser.
A stringified array is returned, so needs to be converted via JSON.parse() */
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

/* Transactions is the array of objects that each stores id, text, and amount.
Extract from user's localStorage if it exists, otherwise an empty array. */
let transactions = 
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

/**
 * Generates a unique ID for the transaction. For now, simply generates the
 * exact millisecond the transaction was created.
 * @returns number that represents a unique ID
 */
function generateID(){
  return new Date().getTime();
}

/**
 * Adds the new transaction
 * @param {Event} e event when user presses submit button 'Add Transaction'
 */
function addTransaction(e) {
  
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a Transaction Name and Amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    
    transactions.push(transaction);

    
    addTransactionDOM(transaction);

    
    updateValues();

    
    updateLocalStorage();

   
    speak("Transaction added successfully. What would you like to do next?");

    
    text.value = '';
    amount.value = '';
  }
}


/**
 * Adds the transaction to the DOM
 * @param {*} transaction the amount of transaction (e.g, 20 or -10)
 */
function addTransactionDOM(transaction){
  
  const sign = transaction.amount < 0 ? '-' : '+';

  /* Recall: a list item in Transaction history follows the format:
      <li class="plus">Cash <span>+$700</span><button class="delete-btn">X</button></li>
  */
  
  
  const item = document.createElement('li');

  
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  
  item.innerHTML =  `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button></li>
  `;

  
  list.appendChild(item);
}


/**
 * Update the budget by calculating the balance, income, and expenses.
 */
function updateValues() {
  
  const amounts = transactions.map(transaction => 
    transaction.amount);

  
  const total = amounts
    .reduce((acc, val) => (acc += val), 0)
    .toFixed(2);
  
  
  const income = amounts
    .filter((transaction) => transaction > 0)
    .reduce((acc, val) => (acc += val), 0)
    .toFixed(2);

  const expense = amounts
    .filter((transaction) => transaction < 0)
    .reduce((acc, val) => (acc += val), 0)
    .toFixed(2);

  balance.innerHTML = `₹${total}`;
  money_plus.innerHTML = `₹${income}`;
  money_minus.innerHTML = `₹${expense}`;
}

/**
 * Remove transaction by its ID from the DOM.
 * @param {number} id the unique id of the transaction
 */
function removeTransaction(id){
  
  transactions = transactions.filter(transaction => transaction.id !== id);

  
  updateLocalStorage();

  
  init();
}

/**
 * Updates the localStorage on the user's browser with new transactions
 */
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

/**
 * Initializes the app with seed data (found in user's localStorage)\
 */
function init(){
  
  list.innerHTML = ''; 

  
  transactions.forEach(addTransactionDOM);
  updateValues();
}


init();

/* Event Listeners */
form.addEventListener('submit', addTransaction);
