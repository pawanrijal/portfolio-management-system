const StockList = (props) => {
  return (
    <>
      <h1>Your stocks</h1>
      <p>{props.data}</p>
    </>
  );
};

export default StockList;
