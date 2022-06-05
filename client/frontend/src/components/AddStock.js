import Alert from "./Alert";
import Dashboard from "./Dashboard";
import stockList from "./StockList";
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let stk = [];

    axios
      .get("http://localhost:3001/stock")
      .then((result) => {
        const { data } = result;
        console.log(data);
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

    axios
      .get("http://localhost:3001/profile/1")
      .then((result) => {
        console.log(result);
        <StockList data={result} />;
      })
      .catch((err) => {
        console.log(err);
      });
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
            onChange={(e) => setType(type === "Buy" ? 0 : 1)}
          >
            <option value={type}>Buy</option>
            <option value={type}>Sell</option>
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
            <StockList />
          </div>
          <div className="col-md-6">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStock;
