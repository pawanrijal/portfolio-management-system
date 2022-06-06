const StockList = (props) => {
  // console.log(data.stockslists);

  return (
    <>
      {props.data.map((obj) => {
        return (
          <tr>
            <td>{obj.id}</td>
            <td>{obj.stockName}</td>
            <td>{obj.type === 0 ? "Buy" : "Sell"}</td>
            <td>{obj.quantity}</td>
            <td>{obj.price}</td>

            {/* <button type="button" class="btn btn-outline-danger">
              Delete
            </button> */}
          </tr>
        );
      })}
    </>
  );
};

export default StockList;
