import { useState, useEffect, useMemo } from "react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";

export function useHomeHook() {
  const [filter, setFilter] = useState("all");
  const [courseList, setCourseList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch awal
  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return filter === "all"
      ? courseList
      : courseList.filter((course) => course.category === filter);
  }, [filter, courseList]);

  // Create
  const handleCreate = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  // Edit
  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  // Save (Create / Update)
  const handleSave = async (course) => {
    try {
      if (editingCourse) {
        // update ke API
        const res = await updateCourse(editingCourse.id, course);
        setCourseList((prev) =>
          prev.map((c) => (c.id === editingCourse.id ? res.data : c))
        );
      } else {
        // create ke API
        const res = await createCourse(course);
        setCourseList((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Save Error:", err);
    } finally {
      setEditingCourse(null);
      setIsModalOpen(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau hapus course ini?")) {
      try {
        await deleteCourse(id);
        setCourseList((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return {
    filter,
    setFilter,
    filteredCourses,
    isModalOpen,
    setIsModalOpen,
    editingCourse,
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    loading,
  };
}
