import Card from "../UI/Card";
// import Alert from "./Alert";
import { useState } from "react";

const AddStock = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");

  const [price, setPrice] = useState("");

  const addStock = () => {};

  return (
    <>
      {/* <Alert message={message} response={response} error={error} /> */}
      <Card title="Add Stock">
        <form onSubmit={addStock}>
          <div className="form-group mb-3">
            <label className="">Enter name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3">
            <label className="">Enter Type</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3">
            <label className="">Enter quantity</label>
            <input
              className="form-control"
              name="name"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3">
            <label className="">Enter Price</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <button type="submit" className="btn btn-success mt-3">
              Submit
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddStock;
