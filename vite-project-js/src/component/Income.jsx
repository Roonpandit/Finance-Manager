import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { Navbar } from "./Navbar";

export function Income() {
  const [data, setdata] = useState({
    amount: "",
    description: "",
    category:"",
    date: "",
  });

  const [incomeList, setIncomeList] = useState([]);

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
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Income.json",
      data
    );

    setdata({
      amount: "",
      description: "",
      category: "",
      date: "",
    });

    fetchIncomeData();
  }

  async function fetchIncomeData() {
    const response = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Income.json"
    );
    const incomeArray = [];
    for (let key in response.data) {
      incomeArray.push({ id: key, ...response.data[key] });
    }
    setIncomeList(incomeArray);
  }

  useEffect(() => {
    fetchIncomeData();
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
        <button onClick={handleadd}>Add Income</button>
      </div>

      <div className="list">
        <h2>Income Records</h2>
        {incomeList.length === 0 ? (
          <p>No income records found.</p>
        ) : (
          <ul>
            {incomeList.map((income) => (
              <li key={income.id}>
                <p>
                  <strong>Amount:</strong> {income.amount}
                </p>
                <p>
                  <strong>Description:</strong> {income.description}
                </p>
                <p>
                  <strong>Category:</strong> {income.category}
                </p>
                <p>
                  <strong>Date:</strong> {income.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
