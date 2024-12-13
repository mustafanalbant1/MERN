import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuth: false,
  user: {},
};
export const register = createAsyncThunk("register", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    "http://localhost:4000/register",
    requestOptions
  );
  return await response.json();
});

export const login = createAsyncThunk("login", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };
  const response = await fetch("http://localhost:4000/login", requestOptions);
  let res = await response.json();
  localStorage.setItem("token", res?.token);
  return res;
});

export const profile = createAsyncThunk("profile", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:4000/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
});

// Slice oluştur
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        console.error(action.error.message);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        console.error(action.error.message);
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })

      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = {};
      });
  },
});

export default userSlice.reducer;
