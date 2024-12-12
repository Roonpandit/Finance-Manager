import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { Navbar } from "./Navbar";

export function Transaction() {
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [filter, setFilter] = useState({ date: "", amount: "", category: "" });
  const [sortBy, setSortBy] = useState("");

  async function fetchData() {
    const incomeResponse = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Income.json"
    );
    const expensesResponse = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Expenses.json"
    );

    const incomeArray = [];
    for (let key in incomeResponse.data) {
      incomeArray.push({ id: key, type: "Income", ...incomeResponse.data[key] });
    }

    const expensesArray = [];
    for (let key in expensesResponse.data) {
      expensesArray.push({
        id: key,
        type: "Expense",
        ...expensesResponse.data[key],
      });
    }

    setIncomeList(incomeArray);
    setExpensesList(expensesArray);
    setTransactionList([...incomeArray, ...expensesArray]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(id, type) {
    if (type === "Income") {
      axios.delete(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Income/${id}.json`
      );
    } else {
      axios.delete(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Expenses/${id}.json`
      );
    }

    setTransactionList(transactionList.filter((item) => item.id !== id));
  }

  function applyFiltersAndSorting() {
    let filteredList = transactionList;

    if (filter.date) {
      filteredList = filteredList.filter((item) => item.date === filter.date);
    }

    if (filter.amount) {
      filteredList = filteredList.filter(
        (item) => parseFloat(item.amount) === parseFloat(filter.amount)
      );
    }

    if (filter.category) {
      filteredList = filteredList.filter(
        (item) => item.category === filter.category
      );
    }

    if (sortBy === "Income") {
      filteredList = filteredList.filter((item) => item.type === "Income");
    } else if (sortBy === "Expense") {
      filteredList = filteredList.filter((item) => item.type === "Expense");
    }

    return filteredList;
  }

  return (
    <>
    <Navbar/>
      <div className="boxes">
      <h1>Transactions</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by Amount"
          onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Category"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
        <input
          type="date"
          placeholder="Filter by Date"
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="Income">Income</option>
          <option value="Expense">Expenses</option>
        </select>
      </div>
      <ul className="boxes2">
        {applyFiltersAndSorting().map((transaction) => (
          <li key={transaction.id}>
            <p>
              <strong>Type:</strong> {transaction.type}
            </p>
            <p>
              <strong>Amount:</strong> {transaction.amount}
            </p>
            <p>
              <strong>Description:</strong> {transaction.description}
            </p>
            {transaction.category && (
              <p>
                <strong>Category:</strong> {transaction.category}
              </p>
            )}
            <p>
              <strong>Date:</strong> {transaction.date}
            </p>
            <button
              className="buttons"
              onClick={() => handleDelete(transaction.id, transaction.type)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
