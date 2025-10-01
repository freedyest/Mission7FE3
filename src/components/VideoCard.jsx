function VideoCard({
  image,
  title,
  description,
  avatar,
  name,
  role,
  company,
  rating,
  review,
  price,
  onEdit,
  onDelete,
}) {
  // generate star (tetap sama)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-yellow-500"
        >
          <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.268L12 19.771l-7.417 4.097L6 15.6 0 9.753l8.332-1.735z" />
        </svg>
      );
    }

    if (hasHalf) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 text-yellow-500"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.268L12 19.771l-7.417 4.097L6 15.6 0 9.753l8.332-1.735z"
            fill="url(#halfGrad)"
            stroke="currentColor"
          />
        </svg>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <svg
          key={`empty-${stars.length}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 text-yellow-500"
        >
          <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.417 8.268L12 19.771l-7.417 4.097L6 15.6 0 9.753l8.332-1.735z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="containervideo desain border border-gray-300 p-3 rounded-lg shadow-sm relative">
      {/* gambar utama */}
      <img
        src={image}
        alt={title}
        className="w-2/5 pr-2 md:pr-0 md:w-full box-border h-32 md:h-48 rounded-lg md:videoimg md:mb-4"
      />

      {/* info course */}
      <div className="w-3/5 box-border md:flex md:w-full md:flex-wrap ">
        <h3 className="font-bold text-lg md:w-full md:mb-4">{title}</h3>
        <p className="hidden md:flex text-gray-600">{description}</p>

        <div className="flex justify-between items-center mt-2">
          <img
            src={avatar}
            alt={name}
            className="avatarimg rounded-lg w-1/5 md:h-12 md:w-auto object-cover"
          />
          <div className="w-4/5 p-2">
            <h4 className="font-semibold">{name}</h4>
            <p className="text-darkgray text-sm">{role}</p>
          </div>
          <p className="hidden md:flex font-semibold text-black mt-6 ">
            {company}
          </p>
        </div>
      </div>

      {/* rating & harga */}
      <div className="rating-container flex items-center gap-2 mt-2 justify-between w-full">
        <div className="flex items-center">
          <div className="rating flex gap-1 mr-4">
            {renderStars(parseFloat(rating))}
          </div>
          <span className="review text-gray-600 text-sm">
            {rating} ({review})
          </span>
        </div>
        <span className="price font-bold ml-auto text-green-600 text-lg">
          {price}
        </span>
      </div>
      {/* tombol edit & delete */}
      {onEdit && onDelete && (
        <div className="flex w-full justify-end">
          <div className="flex w-1/4 justify-between h-8">
            <button
              onClick={onEdit}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
