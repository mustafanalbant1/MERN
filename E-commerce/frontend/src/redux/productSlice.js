import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  adminProducts: [],
  product: {},
  loading: false,
};

// Async thunk işlemi
//params olma sebebi tek tek girersek dsadece ilk veriyi alır onun yerine params için alıyoruz
export const getProducts = createAsyncThunk("products", async (params) => {
  let link = `http://localhost:4000/products?keyword=${
    params.keyword || ""
  }&rating[gte]=${params.rating || 0}&price[gte]=${
    params.price.min || 0
  }&price[lte]=${params.price.max || 30000}`;

  if (params.category) {
    link += `&category=${params.category}`;
  }

  const response = await fetch(link);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json(); // Tek seferde JSON parse işlemi
  return data;
});

export const getProductsDetail = createAsyncThunk("product", async (id) => {
  const response = await fetch(`http://localhost:4000/products/${id}`);

  return response.json();
});

export const getAdminProduct = createAsyncThunk("admin", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        console.error(action.error.message);
      })
      .addCase(getProductsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductsDetail.rejected, (state, action) => {
        state.loading = false;
        console.error(action.error.message);
      })
      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload;
      });
  },
});

export default productSlice.reducer;
