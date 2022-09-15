import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
const initialState = {
  movies: [],
  moviesFilter: [],
  load:false
};

export const fetchmovies = createAsyncThunk(
  "fetch/movies",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/movies");
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const moviesSclice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    filterMovies: (state, action) => {
      state.moviesFilter = state.movies.filter((item) => {
       console.log(action.payload)
      });
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchmovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.load = false
      if (state.moviesFilter.length < 1) {
        state.moviesFilter = action.payload;
      }
    })
    .addCase(fetchmovies.pending,(state,action)=>{
      state.load = true
    })
  },
  
});
export const { filterMovies } = moviesSclice.actions;

export default moviesSclice.reducer;
