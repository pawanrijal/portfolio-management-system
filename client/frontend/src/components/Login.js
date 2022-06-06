import axios from "axios";

import { useEffect, useState } from "react";
import Card from "../UI/Card";
import AddStock from "./AddStock";

import Alert from "./Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    function getCookie(name) {
      var cookieArr = document.cookie.split(";");

      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }

      return null;
    }

    let token = getCookie("token");

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get("http://localhost:3001/profile", config)
      .then((result) => {
        setLogin(true);
      })
      .catch((err) => {
        setLogin(false);
      });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setMessage(res.data.message);
        setResponse(true);
        setError(false);
        setLogin(true);
        document.cookie = `token=${res.data.data};expires=Wed, 05 Aug 2022 23:00:00 UTC`;
      })
      .catch((err) => {
        setResponse(true);
        setMessage(err.response.data.message);
        setError(true);
        setLogin(false);
      });
  };

  return login ? (
    <AddStock />
  ) : (
    <>
      <Alert message={message} response={response} error={error} />
      <Card title="Login">
        <form className="" onSubmit={handleSubmit}>
          <label className="">Enter email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label className="">Enter Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>
        </form>
      </Card>
    </>
  );
}
