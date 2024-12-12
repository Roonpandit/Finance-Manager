import React from 'react';
import "../index.css"
import Nav2 from './Nav2';

function About() {
  return (
    <div>
    <Nav2/>
    <div className="about-container">
      <h1 className="about-title">About Our Company</h1>
      
      <p className="about-description">
        Welcome to our financial management platform, your trusted partner in managing income, expenses, and transactions. 
        We help individuals and businesses track their financial activities, gain insights into their spending patterns, 
        and optimize their budgets for a more secure future.
      </p>

      <h2 className="about-section-title">Our Mission</h2>
      <p className="about-text">
        Our mission is to empower individuals and businesses to take control of their financial journey with simple, 
        user-friendly tools that track and manage income, expenses, and transactions efficiently.
      </p>

      <h2 className="about-section-title">What We Do</h2>
      <ul className="about-list">
        <li>Income Tracking: Keep track of all sources of income seamlessly.</li>
        <li>Expense Management: Organize and categorize your expenses to save more.</li>
        <li>Transaction Monitoring: Monitor and record transactions in real-time.</li>
        <li>Financial Insights: Get data-driven insights and recommendations for better money management.</li>
      </ul>

      <h2 className="about-section-title">Our Vision</h2>
      <p className="about-text">
        We envision a world where everyone can manage their finances effortlessly, 
        make informed financial decisions, and achieve their financial goals with confidence.
      </p>

      <p className="about-text">
        Join us on this journey towards financial freedom and security. We're here to help you every step of the way.
      </p>
    </div>
    </div>
  );
}

export default About;
