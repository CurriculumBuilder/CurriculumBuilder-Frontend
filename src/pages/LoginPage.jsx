import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/LoginPage.css";

const API_URL = import.meta.env.VITE_API_URL

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    console.log("here is the error");
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1 className="title-login">Login</h1>
      <br />
      <form onSubmit={handleLoginSubmit} className="form-login-page">
        <label className="email-label">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="email-input"
        />

        <label className="pw-label">Password:</label>
        <input
          className="pw-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit" className="btn-login">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <br />
      <br />
      <p className="p-login">Don't have an account yet?</p>
      <br />
      <button className="btn-sign-up-login"><Link to={"/signup"}> Sign Up</Link></button>
    </div>
  );
}

export default LoginPage;
