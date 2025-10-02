import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";

// Thunk untuk fetch data dari API
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await getCourses();
    return res.data.map((c) => ({ ...c, id: String(c.id) }));
  }
);

// Thunk untuk create
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course) => {
    const res = await createCourse(course);
    return { ...res.data, id: String(res.data.id) };
  }
);

// Thunk untuk update
export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async ({ id, data }) => {
    const res = await updateCourse(String(id), data);
    return res.data;
  }
);

// Thunk untuk delete
export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (id) => {
    await deleteCourse(String(id));
    return String(id);
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    filter: "all",
    isModalOpen: false,
    editingCourse: null,
    loading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.editingCourse = action.payload || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === String(action.payload.id) ? action.payload : c
        );
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== String(action.payload));
      });
  },
});

export const { setFilter, openModal, closeModal } = courseSlice.actions;
export default courseSlice.reducer;
