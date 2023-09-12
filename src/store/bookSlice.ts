import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAPIResponse, IBook } from "../types";

interface BooksState {
  search: string;
  list: IBook[];
  totalItems: number;
  currentBook: IBook;
  category: string;
  sort: string;
  page: number;
  loading: boolean;
  error: string | null;
}

export const fetchBooks = createAsyncThunk<
  IAPIResponse,
  { search: string; sort: string; page: number },
  { rejectValue: string }
>(
  "books/fetchBooks",
  async function ({ search, sort, page }, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=${sort}&startIndex=${page}&maxResults=30&key=AIzaSyAFG1qTFrj_I0sUslz2JCjTg_A6jBBUcFE`
      );

      if (!response.ok) rejectWithValue("Something went wrong");

      const data = await response.json();

      return data;
    } catch (error) {}
  }
);

const initialState: BooksState = {
  search: "",
  list: [],
  totalItems: 0,
  currentBook: {} as IBook,
  category: "",
  sort: "relevance",
  page: 0,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    handleSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    handleCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    handleChangePage(state) {
      state.page += 30;
    },
    handleBookCardClick(state, action: PayloadAction<IBook>) {
      state.currentBook = action.payload;
    },
    handleSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearBooksList(state) {
      state.list = [];
    },
    clearPage(state) {
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.items];
        state.totalItems = action.payload.totalItems;
        state.loading = false;
      });
  },
});

export const {
  handleSort,
  handleCategory,
  handleChangePage,
  handleBookCardClick,
  handleSearch,
  clearBooksList,
  clearPage,
} = bookSlice.actions;
export default bookSlice.reducer;
