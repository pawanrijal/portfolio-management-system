const StockList = (props) => {
  // console.log(data.stockslists);
  function format_date(dt) {
    var dd = dt.getDate();
    var mm = dt.getMonth() + 1; //January is 0!
    var yyyy = dt.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    dt = mm + "/" + dd + "/" + yyyy;
    return dt;
  }

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
