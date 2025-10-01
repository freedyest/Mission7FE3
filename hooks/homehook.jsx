import { useState, useMemo } from "react";
import { courses as initialCourses } from "../data/courses";

export function homehook() {
  const [filter, setFilter] = useState("all");
  const [courseList, setCourseList] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

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
  const handleSave = (course) => {
    if (editingCourse) {
      setCourseList((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...course } : c))
      );
    } else {
      setCourseList((prev) => [
        ...prev,
        { ...course, id: crypto.randomUUID() },
      ]);
    }
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus course ini?")) {
      setCourseList((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return {
    filter,
    setFilter,
    courseList,
    filteredCourses,
    isModalOpen,
    setIsModalOpen,
    editingCourse,
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
  };
}
