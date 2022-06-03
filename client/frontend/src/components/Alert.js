export default function Alert(props) {
  return (
    <>
      {props.response ? (
        props.error ? (
          <div class="alert alert-danger" role="alert">
            {props.message}
          </div>
        ) : (
          <div class="alert alert-primary" role="alert">
            {props.message}
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
}
