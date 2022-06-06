import Alert from "./Alert";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import StockList from "./StockList";

const axios = require("axios");

const AddStock = () => {
  const [stock, setStock] = useState([]);
  const [stockName, setStockName] = useState("");
  const [type, setType] = useState(0);
  const [quantity, setQuantity] = useState("");

  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(false);

  const [userStocks, setUserStocks] = useState([]);

  const [loggedIn, setLoggedIn] = useState(true);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let stk = [];
    let userStock = [];

    axios
      .get("http://localhost:3001/stock")
      .then((result) => {
        const { data } = result;
        data.data.forEach((element) => {
          stk.push(element.name);
        });

        setStock(stk);
        setStockName(stk[0]);
      })
      .catch((err) => {
        console.log(err);
        setStock(null);
      });
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
        const { data } = result;
        data.data.stockslists.forEach((element) => {
          userStock.push(element);
        });

        setUserStocks(userStock);
      })
      .catch((err) => {
        setResponse(true);
        setError(true);
        setMessage(err.response.data.message);
        setLoggedIn(false);
      });
    let stkData = [];

    axios
      .get("http://localhost:3001/dashboard", config)
      .then((result) => {
        const { data } = result;

        // data.data.name.forEach((element) => stkName.push(element));
        data.data.forEach((element) => {
          stkData.push(element);
        });
      })
      .catch((err) => {
        setResponse(true);
        setError(true);
        setMessage(err.response.data.message);
        setLoggedIn(false);
      });

    setStockData(stkData);
  };

  const onAdd = (e) => {
    console.log("name:", stockName);
    e.preventDefault();
    const request = {
      stockName: stockName,
      type: type,
      quantity: quantity,
      price: price,
      transactionDate: date,
      userId: 1,
    };
    axios
      .post("http://localhost:3001/stockList", request)
      .then((res) => {
        setError(false);
        setMessage(res.data.message);
        setResponse(true);
      })
      .catch((err) => {
        setResponse(true);
        setError(true);
        setMessage(err.response.data.message);
      });
  };

  return loggedIn ? (
    <>
      <Alert message={message} response={response} error={error} />
      <div
        className="container"
        style={{ border: "solid 1px", marginTop: "30px" }}
      >
        <form
          className="form-group "
          style={{
            marginTop: "50px",
            marginLeft: "100px",
            marginBottom: "50px",
          }}
          onSubmit={onAdd}
        >
          <label>Enter Stock Options</label>
          <select
            style={{ marginLeft: "20px" }}
            onChange={(e) => {
              setStockName(e.target.value);
            }}
            value={stockName}
          >
            {stock.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </select>

          <label>Type</label>
          <select
            style={{ marginLeft: "30px" }}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={0}>Buy</option>
            <option value={1}>Sell</option>
          </select>
          <input
            placeholder="Enter quantity"
            style={{ marginLeft: "30px" }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <input
            placeholder="Enter price"
            style={{ marginLeft: "30px" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <input
            style={{ marginLeft: "30px" }}
            placeholder="Enter Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <button
            type="submit"
            placeholder="Enter price"
            className="btn btn-success"
            style={{ marginLeft: "30px" }}
          >
            Add
          </button>
        </form>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Your Stocks</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <StockList data={userStocks} />
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <Dashboard data={stockData} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Alert message={message} response={response} error={error} />
      <h1>Unauthorized</h1>
    </>
  );
};

export default AddStock;
