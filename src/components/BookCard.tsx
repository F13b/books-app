import { useAppDispatch, useAppSelector } from "../hook";
import { handleBookCardClick } from "../store/bookSlice";
import { IBook } from "../types";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const BookCard = ({ book }: { book: IBook }) => {
  const error = useAppSelector((state) => state.books.error);
  const dispatch = useAppDispatch();

  if (error != null) return <ErrorPage />;

  const {
    volumeInfo: { title, imageLinks, categories, authors },
  } = book;

  return (
    <Link
      to={`${book.id}`}
      onClick={() => dispatch(handleBookCardClick(book))}
      className="w-full p-4 flex flex-col items-center border shadow-lg rounded-md"
    >
      <img
        className="drop-shadow-lg rounded-md"
        src={imageLinks === undefined ? "" : imageLinks.thumbnail}
        alt={`${title}`}
      />
      <div className="w-full h-full mt-3 flex flex-col justify-between">
        <h2 className="font-bold max-h-8 truncate">{title}</h2>
        <div>
          <p className="text-sm mt-3">
            Category: {categories !== undefined ? categories[0] : ""}
          </p>
          <p className="text-xs mt-1">
            Authors: {authors !== undefined ? authors.join(", ") : ""}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
