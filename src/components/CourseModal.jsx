import { useState, useEffect } from "react";

function CourseModal({ isOpen, onClose, onSave, initialData }) {
  const defaultForm = {
    image: "",
    title: "",
    desc: "",
    avatar: "",
    instructor: "",
    role: "",
    company: "",
    rating: 0,
    reviews: 0,
    price: "",
    category: "",
  };

  const [form, setForm] = useState(defaultForm);

  const [imageMode, setImageMode] = useState("url");
  const [avatarMode, setAvatarMode] = useState("url");

  // Reset form setiap kali modal dibuka
  useEffect(() => {
    setForm(initialData || defaultForm);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, [field]: url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  const categories = ["desain", "pengembangan", "bisnis", "pemasaran"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Update Course" : "Create Course"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2"
        >
          {/* Title */}
          <p>Title</p>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />

          {/* Description */}
          <p>Description</p>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded min-h-32"
            rows="3"
          />

          {/* Category */}
          <p>Category</p>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">-- Pilih Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Image */}
          <p>Image disarankan pakai url </p>
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                checked={imageMode === "url"}
                onChange={() => setImageMode("url")}
              />{" "}
              URL
            </label>
            <label>
              <input
                type="radio"
                checked={imageMode === "upload"}
                onChange={() => setImageMode("upload")}
              />{" "}
              Upload
            </label>
          </div>
          {imageMode === "url" ? (
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 rounded"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
              className="border p-2 rounded"
            />
          )}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-20 object-cover mt-2 rounded"
            />
          )}

          {/* Avatar */}
          <p>Avatar disarankan pakai url</p>
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                checked={avatarMode === "url"}
                onChange={() => setAvatarMode("url")}
              />{" "}
              URL
            </label>
            <label>
              <input
                type="radio"
                checked={avatarMode === "upload"}
                onChange={() => setAvatarMode("upload")}
              />{" "}
              Upload
            </label>
          </div>
          {avatarMode === "url" ? (
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="border p-2 rounded"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
              className="border p-2 rounded"
            />
          )}
          {form.avatar && (
            <img
              src={form.avatar}
              alt="preview"
              className="w-16 h-16 object-cover mt-2 rounded-full"
            />
          )}

          {/* Instructor */}
          <p>Instructor</p>
          <input
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            placeholder="Instructor Name"
            className="border p-2 rounded"
          />

          {/* Role */}
          <p>Role</p>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-2 rounded"
          />

          {/* Company */}
          <p>Company</p>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="border p-2 rounded"
          />

          {/* Rating */}
          <p>Rating</p>
          <input
            name="rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-2 rounded"
          />

          {/* Reviews */}
          <p>Reviews</p>
          <input
            name="reviews"
            type="number"
            value={form.reviews}
            onChange={handleChange}
            placeholder="Review Count"
            className="border p-2 rounded"
          />

          {/* Price */}
          <p>Price</p>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseModal;
