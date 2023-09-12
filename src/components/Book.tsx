import { useEffect } from "react";
import { useAppSelector } from "../hook";
import ErrorPage from "./ErrorPage";

const Book = () => {
  const book = useAppSelector((state) => state.books.currentBook);
  const error = useAppSelector((state) => state.books.error);

  const {
    volumeInfo: { title, imageLinks, categories, authors, description },
  } = book;

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (error != null) return <ErrorPage />;

  return (
    <div className="w-full h-full">
      <div className="w-90 mx-auto py-20 grid gap-10 grid-cols-1 lg:w-3/4 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            className="drop-shadow-lg rounded-md"
            src={imageLinks === undefined ? "" : imageLinks.thumbnail}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="mt-3">
            <p className="text-lg mt-3">
              Category: {categories !== undefined ? categories : ""}
            </p>
            <p className="text-lg mt-1">
              Authors: {authors !== undefined ? authors.join(", ") : ""}
            </p>
          </div>
          <div className="mt-5">
            <p className="text-lg">Description:</p>
            <p className="mt-2">
              {description !== undefined ? description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
