const Dashboard = (props) => {
  return (
    <>
      <h1>Dashboard</h1>
      <ol>
        {props.data.map((obj) => (
          <li key={obj.id}>
            <h4>Name:{obj.name}</h4>
            <p>Buy Units:{obj.buyUnits}</p>
            <p>Sold Amount: Rs {obj.soldAmount}</p>
            <p>Total InvestMent: Rs {obj.totalInvestMent}</p>
            <p>Profit: Rs {obj.profit}</p>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Dashboard;
