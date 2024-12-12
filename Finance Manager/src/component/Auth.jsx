import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'; 
import "../index.css"; 
import axios from "axios";
import Nav2 from "./Nav2";

const Auth = () => {
  const [formType, setFormType] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from context
  const [data, setData] = useState({});

  const [signupData, setSignupData] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    gmail: "",
    password: "",
  });

  useEffect(() => {
    fetchAuthData();
  }, []);

  const fetchAuthData = async () => {
    try {
      const response = await axios.get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/LogInData.json"
      );
      setData(response.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const { name, gmail, password, confirmPassword } = signupData;

    if (!name || !gmail || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (Object.values(data).some((user) => user.gmail === gmail)) {
      alert("User already exists with this Gmail!");
      return;
    }

    try {
      await axios.post(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/FinanceManager/LogInData.json",
        { name, gmail, password }
      );

      alert("Account created successfully! Please login.");
      setSignupData({ name: "", gmail: "", password: "", confirmPassword: "" });
      setFormType("login");
      fetchAuthData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    const { gmail, password } = loginData;

    if (!gmail || !password) {
      alert("All fields are required!");
      return;
    }

    const user = Object.values(data).find(
      (user) => user.gmail === gmail && user.password === password
    );

    if (user) {
      login(); // Set authentication state to true
      navigate("/summary");
    } else {
      alert("Invalid Gmail or Password!");
      setLoginData({ gmail: "", password: "" });
    }
  };

  return (
    <div>
      <Nav2 />
      <div className="auth-content">
        <div className="auth-container">
          <div className="welcome-section">
            <h1>Welcome to Financial Manager</h1>
            <p>Manage your finances effectively and efficiently.</p>
          </div>

          {formType === "" && (
            <div className="button-container">
              <button onClick={() => setFormType("login")} className="auth-button">
                Login
              </button>
              <button onClick={() => setFormType("signup")} className="auth-button">
                Sign Up
              </button>
            </div>
          )}

          {formType === "login" && (
            <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Gmail:</label>
                  <input
                    value={loginData.gmail}
                    onChange={(e) => setLoginData({ ...loginData, gmail: e.target.value })}
                    type="email"
                    placeholder="Enter Gmail"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <button onClick={handleLogin} className="form-button">
                  Login
                </button>
              </form>
              <p>
                Don't have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => setFormType("signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {formType === "signup" && (
            <div className="form-container">
              <h2>Sign Up</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label>Gmail:</label>
                  <input
                    value={signupData.gmail}
                    onChange={(e) => setSignupData({ ...signupData, gmail: e.target.value })}
                    type="email"
                    placeholder="Enter Gmail"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({ ...signupData, confirmPassword: e.target.value })
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <button onClick={handleSignup} className="form-button">
                  Create Account
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <span
                  className="link-text"
                  onClick={() => setFormType("login")}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
