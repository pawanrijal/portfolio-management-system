import { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(false);

  const signup = (event) => {
    event.preventDefault();
    const request = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
    };

    console.log(request);
    axios
      .post("http://localhost:3001/register", request)
      .then((res) => {
        setError(false);
        console.log(res.status);
        setMessage(res.data.message);
        setResponse(true);
      })
      .catch((err) => {
        console.log(err);
        setResponse(true);
        setError(true);
        setMessage(err.response.data.message);
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
            <h5 className="card-title d-flex justify-content-center">
              Sign Up
            </h5>

            <div className="container">
              <div className="row">
                <div className="col-mb-12 px-10 py-10">
                  <form className="" onSubmit={signup}>
                    <div className="form-group mb-3">
                      <label className="">Enter Username</label>
                      <input
                        className="form-control"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group mb-3">
                      <label className="">Enter email</label>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group mb-3">
                      <label className="">Enter Password</label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group mb-3">
                      {" "}
                      <label className="">Confirm Password</label>
                      <input
                        className="form-control"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                    </div>

                    <div className="form-group mb-3">
                      <label className="">Phone No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group mb-3">
                      <input type="submit" className="btn btn-success"></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
