import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";

// Async Thunks
export const fetchCourses = createAsyncThunk("course/fetchAll", async () => {
  const res = await getCourses();
  return res.data.map((c) => ({ ...c, id: String(c.id) }));
});

export const addCourse = createAsyncThunk("course/add", async (course) => {
  const res = await createCourse(course);
  return { ...res.data, id: String(res.data.id) };
});

export const editCourse = createAsyncThunk(
  "course/edit",
  async ({ id, data }) => {
    const res = await updateCourse(String(id), data);
    return res.data;
  }
);

export const removeCourse = createAsyncThunk("course/delete", async (id) => {
  await deleteCourse(String(id));
  return id;
});

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseList: [],
    filter: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // add
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courseList.push(action.payload);
      })
      // edit
      .addCase(editCourse.fulfilled, (state, action) => {
        state.courseList = state.courseList.map((c) =>
          String(c.id) === String(action.payload.id) ? action.payload : c
        );
      })
      // delete
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.courseList = state.courseList.filter(
          (c) => String(c.id) !== String(action.payload)
        );
      });
  },
});

export const { setFilter } = courseSlice.actions;
export default courseSlice.reducer;
