export default function Alert(props) {
  return (
    <>
      {props.response ? (
        props.error ? (
          <div className="alert alert-danger" role="alert">
            {props.message}
          </div>
        ) : (
          <div className="alert alert-primary" role="alert">
            {props.message}
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
}
