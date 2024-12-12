import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { Navbar } from "./Navbar";

export function Expenses() {
  const [data, setdata] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const [expensesList, setexpensesList] = useState([]);

  function inputhandler(e) {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  async function handleadd() {
    if (!data.amount) {
      alert("Enter Amount");
      return;
    }
    if (!data.description) {
      alert("Enter Description");
      return;
    }
    if (!data.category) {
        alert("Enter categary");
        return;
      }
    if (!data.date) {
      alert("Select Date");
      return;
    }

    await axios.post(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Expenses.json",
      data
    );

    setdata({
      amount: "",
      description: "",
      category:"",
      date: "",
    });

    fetchExpensesData();
  }

  async function fetchExpensesData() {
    const response = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Expenses.json"
    );
    const expensesArray = [];
    for (let key in response.data) {
        expensesArray.push({ id: key, ...response.data[key] });
    }
    setexpensesList(expensesArray);
  }

  useEffect(() => {
    fetchExpensesData();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="box">
        <input
          type="text"
          placeholder="Amount"
          value={data.amount}
          name="amount"
          onChange={inputhandler}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={data.description}
          onChange={inputhandler}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={data.category}
          onChange={inputhandler}
        />
        <input
          type="date"
          placeholder="Date"
          value={data.date}
          onChange={inputhandler}
          name="date"
        />
        <button onClick={handleadd}>Add Expenses</button>
      </div>

      <div className="list">
        <h2>Expenses Records</h2>
        {expensesList.length === 0 ? (
          <p>No Expenses records found.</p>
        ) : (
          <ul>
            {expensesList.map((expenses) => (
              <li key={expenses.id}>
                <p>
                  <strong>Amount:</strong> {expenses.amount}
                </p>
                <p>
                  <strong>Description:</strong> {expenses.description}
                </p>
                <p>
                  <strong>Category:</strong> {expenses.category}
                </p>
                <p>
                  <strong>Date:</strong> {expenses.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
