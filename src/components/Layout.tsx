import { Outlet, Link } from "react-router-dom";
import bookLogo from "../assets/book-60.png";
import ErrorPage from "./ErrorPage";
import { useAppSelector } from "../hook";

const Layout = () => {
  const error = useAppSelector((state) => state.books.error);

  if (error != null) return <ErrorPage />;

  return (
    <>
      <header className="w-full px-10 py-3">
        <Link
          to="/"
          className="flex justify-center items-center md:justify-start"
        >
          <img className="hidden md:block" src={bookLogo} alt="book icon" />
          <span className="ml-0 text-4xl font-bold md:ml-5">Books App</span>
        </Link>
      </header>
      <main className="bg-gray-100">
        <Outlet />
      </main>
      <footer className="w-90 mx-auto my-10">
        <span>Made by Pavel Kononenkov 👨‍💻</span>
        <p className="mt-1">
          Contact me in:{" "}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://github.com/F13b"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>{" "}
          ,{" "}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="https://t.me/we_we_13"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>{" "}
          or{" "}
          <a
            className="text-blue-500 hover:text-blue-700"
            href="mailto:p.a.kononenkov@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Gmail
          </a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
