import { useAppDispatch, useAppSelector } from "../hook";
import {
  clearBooksList,
  clearPage,
  fetchBooks,
  handleCategory,
  handleChangePage,
  handleSort,
  handleSearch as setSearch,
} from "../store/bookSlice";
import { IBook } from "../types";
import BookCard from "./BookCard";
import { CircularProgress } from "@mui/material";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const search = useAppSelector((state) => state.books.search);
  const sort = useAppSelector((state) => state.books.sort);
  const category = useAppSelector((state) => state.books.category);
  const pages = useAppSelector((state) => state.books.page);
  const books = useAppSelector((state) => state.books.list);
  const totalItems = useAppSelector((state) => state.books.totalItems);
  const loading = useAppSelector((state) => state.books.loading);
  const error = useAppSelector((state) => state.books.error);
  const dispatch = useAppDispatch();

  if (error != null) return <ErrorPage />;

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      dispatch(clearPage());
      dispatch(clearBooksList());
      const page = pages;
      dispatch(fetchBooks({ search, sort, page }));
    }
  };

  const handleButtonSearch = () => {
    dispatch(clearPage());
    dispatch(clearBooksList());
    const page = pages;
    dispatch(fetchBooks({ search, sort, page }));
  };

  const filterBooks = (item: IBook) => {
    if (category === "") {
      return item;
    } else {
      if (item.volumeInfo.categories !== undefined) {
        return item.volumeInfo.categories.includes(category);
      }
    }
  };

  return (
    <>
      <div className="w-full mb-10">
        <div className="w-full bg-slate-600">
          <div className="w-90 h-full mx-auto py-5 flex flex-col items-center md:w-3/4">
            <div className="w-full flex flex-col lg:w-2/4">
              <div className="flex items-end">
                <div className="w-full flex flex-col">
                  <label className="mb-1 text-white" htmlFor="search">
                    Search
                  </label>
                  <input
                    className="py-1 px-2 rounded-md"
                    name="search"
                    id="search"
                    value={search}
                    onChange={(e: any) => dispatch(setSearch(e.target.value))}
                    onKeyDown={handleSearch}
                  />
                </div>
                <button
                  className="ml-3 px-6 py-1 text-white rounded-md bg-green-500 hover:bg-green-600"
                  onClick={handleButtonSearch}
                >
                  Search
                </button>
              </div>
              <div className="mt-4 grid gap-4 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
                <div className="flex flex-col">
                  <label className="mb-1 text-white" htmlFor="categories">
                    Categories
                  </label>
                  <select
                    className="w-full py-1 px-2 rounded-md"
                    name="categories"
                    id="categories"
                    value={category}
                    onChange={(e: any) =>
                      dispatch(handleCategory(e.target.value))
                    }
                  >
                    <option value="">All</option>
                    <option value="Art">Art</option>
                    <option value="Biography">Biography</option>
                    <option value="Computers">Computers</option>
                    <option value="History">History</option>
                    <option value="Medical">Medical</option>
                    <option value="Poetry">Poetry</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-white" htmlFor="sort">
                    Sorting by
                  </label>
                  <select
                    className="w-full py-1 px-2 rounded-md"
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e: any) => dispatch(handleSort(e.target.value))}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-40">
            <CircularProgress />
          </div>
        ) : books.length <= 0 ? null : (
          <>
            <div className="w-90 mx-auto py-5 flex flex-col lg:w-3/4">
              <p className="mb-5 text-lg">Results found {totalItems}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {books
                  .filter((item) => filterBooks(item))
                  .map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
            </div>
            <div className="py-5 flex justify-center">
              <button
                className="px-6 py-1 text-white rounded-md bg-green-500 hover:bg-green-600"
                onClick={() => {
                  dispatch(handleChangePage());
                  const page: number = pages + 30;
                  dispatch(fetchBooks({ search, sort, page }));
                }}
              >
                Load more
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
