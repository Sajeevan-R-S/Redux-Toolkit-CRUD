import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action into api
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("data: ", data);
    const response = await fetch(
      "https://64b8411f21b9aa6eb079b6f4.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// read action from api
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://64b8411f21b9aa6eb079b6f4.mockapi.io/crud"
    );
    try {
      const result = await response.json();
      console.log("Read user: ", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete action to api
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://64b8411f21b9aa6eb079b6f4.mockapi.io/crud/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = await response.json();
      console.log("Delete user: ", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Update to api

export const editUser = createAsyncThunk(
  "editUser",
  async (data, { rejectWithValue }) => {
    console.log("Updated Data: ", data);
    const response = await fetch(
      `https://64b8411f21b9aa6eb079b6f4.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      console.log("RESUTL: ", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchItem: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchItem = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchUser } = userDetailSlice.actions;

export default userDetailSlice.reducer;
