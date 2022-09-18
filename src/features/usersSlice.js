import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  favorite: [],
  load: false,
  error:null
};

export const fetchUser = createAsyncThunk("fetch/user", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/users/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(data.error){
      return thunkAPI.rejectWithValue(data.error)
  }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToFavorite = createAsyncThunk(
  "addFavorite/user",
  async ({ id, movieId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/users/addFav/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movieId }),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "removeFavorite/user",
  async ({ id, movieId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/users/removeFav/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movieId }),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removebuymovies = createAsyncThunk(
  "removebuy/movies",
  async ({ id, movieId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/users/removebuy/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movieId }),
      });
      const data = await res.json();

      return {id,movieId};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.rejected, (state, action) => {
     
      state.error = action.payload
      state.load = false
     
      
    })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.load = false;
        state.error = null
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.load = true;
      })

      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.users = state.users.map((item) => {
          if (item._id === action.payload.user._id) {
            return {
              ...item,
              movies: item.movies.filter((i) => {
                return i._id !== action.payload.movie._id;
              }),
            };
          }
        });
      })
      .addCase(removebuymovies.fulfilled, (state, action) => {
        state.users = state.users.map((item) => {
          if (item._id === action.payload.id) {
           
            return {
              ...item,
              buymovies: item.buymovies.filter((i) => {
                return i._id !== action.payload.movieId;
              }),
            };
          }
        })
        
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
       
        state.users.map((item) => {
          if (item._id === action.payload.user._id) {
            item.movies.push(action.payload.movie);
          }
        });
      })
      
  },
});

export default userSclice.reducer;
