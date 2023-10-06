import { useNavigate, useRouteError } from "react-router";

function Error() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  const error = useRouteError();
  return (
    <div>
      {error.message}
      <button onClick={handleClick}>Go Back</button>{" "}
    </div>
  );
}

export default Error;
