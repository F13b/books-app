import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useAppSelector } from "../hook";

const ErrorPage = () => {
  const error = useRouteError();
  const rerror = useAppSelector((state) => state.books.error);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="mt-2 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mt-3">
        <i>{errorMessage}</i>
        <br />
        <i>{rerror}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
