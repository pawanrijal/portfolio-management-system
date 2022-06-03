import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const signup = () => {};

  return (
    <>
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
              <form className="form-control" onSubmit={signup}>
                <label className="">Enter Username</label>
                <input className="form-control" name="username"></input>
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
                <label className="">Confirm Password</label>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <label className="">Phone No</label>
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
                <input type="submit" className="btn btn-success"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
