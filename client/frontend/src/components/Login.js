import axios from "axios";

import { useState } from "react";

import Alert from "./Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setMessage(res.data.message);
        setResponse(true);
        setError(false);
        document.cookie = `token=${res.data.data};expires=Wed, 05 Aug 2022 23:00:00 UTC`;
      })
      .catch((err) => {
        setResponse(true);
        setMessage(err.response.data.message);
        setError(true);
      });
  };

  return (
    <>
      <Alert message={message} response={response} error={error} />

      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="card " style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-center">Login</h5>

            <div className="container">
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
                <input type="submit" className="btn btn-success"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
