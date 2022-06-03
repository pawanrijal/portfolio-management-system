const Card = (props) => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="card " style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-center">
              {props.title}
            </h5>
            {props.children}
            <div className="container">
              <div className="row">
                <div className="col-mb-12 px-10 py-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
