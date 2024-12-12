import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import { Navbar } from "./Navbar";
export function Summary() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [mostFrequentExpense, setMostFrequentExpense] = useState("N/A");
  const [avgMonthlyIncome, setAvgMonthlyIncome] = useState(0);
  const [avgMonthlyExpenses, setAvgMonthlyExpenses] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const incomeResponse = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Income.json"
    );
    const incomeArray = [];
    for (let key in incomeResponse.data) {
      incomeArray.push({ ...incomeResponse.data[key] });
    }

    const totalInc = incomeArray.reduce((sum, item) => sum + Number(item.amount), 0);
    setTotalIncome(totalInc);
    const avgInc = totalInc / 12;
    setAvgMonthlyIncome(avgInc.toFixed(2));

    const expensesResponse = await axios.get(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/Expenses.json"
    );
    const expensesArray = [];
    for (let key in expensesResponse.data) {
      expensesArray.push({ ...expensesResponse.data[key] });
    }

    const totalExp = expensesArray.reduce((sum, item) => sum + Number(item.amount), 0);
    setTotalExpenses(totalExp);
    const avgExp = totalExp / 12;
    setAvgMonthlyExpenses(avgExp.toFixed(2));

    const categoryFrequency = {};
    expensesArray.forEach((item) => {
      const category = item.category || "Other";
      categoryFrequency[category] = (categoryFrequency[category] || 0) + 1;
    });
    const mostFreq = Object.keys(categoryFrequency).reduce((a, b) =>
      categoryFrequency[a] > categoryFrequency[b] ? a : b
    );
    setMostFrequentExpense(mostFreq);
  }

  return (
    <>
      <Navbar/>
      <div className="home-container">
        <h1>Financial Dashboard</h1>
        <div className="summary">
          <div className="summary-item">
            <h3>Total Income:</h3>
            <p>Rs. {totalIncome}</p>
          </div>
          <div className="summary-item">
            <h3>Total Expenses:</h3>
            <p>Rs. {totalExpenses}</p>
          </div>
          <div className="summary-item">
            <h3>Most Frequent Expense:</h3>
            <p>Rs. {mostFrequentExpense}</p>
          </div>
          <div className="summary-item">
            <h3>Avg. Monthly Income:</h3>
            <p>Rs. {avgMonthlyIncome}</p>
          </div>
          <div className="summary-item">
            <h3>Avg. Monthly Expenses:</h3>
            <p>Rs. {avgMonthlyExpenses}</p>
          </div>
        </div>
       
        </div> 

    </>
  );
}