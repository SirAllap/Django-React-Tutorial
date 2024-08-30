/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data =
      method === "login" ? { email, password } : { username, email, password };

    try {
      const res = await api.post(route, data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-white rounded-md text-indigo-900"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {method !== "login" && (
        <input
          className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-white rounded-md text-indigo-900"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      )}

      <input
        className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-white rounded-md text-indigo-900"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <p className="my-2">
        {method === "login" ? "Haven't register yet? " : "Already register? "}
        {method === "login" ? (
          <span
            className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-600"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        ) : (
          <span
            className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-600"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}
      </p>
      <button
        className="border border-indigo-300 bg-indigo-500 py-2 px-5 min-w-full text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300"
        type="submit"
      >
        {loading ? "Loading..." : name}
      </button>
    </form>
  );
};

export default Form;
