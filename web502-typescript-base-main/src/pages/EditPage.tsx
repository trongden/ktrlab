import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface MovieFormData {
  title: string;
  director: string;
  year: number | string;
  genre: string;
  duration: number | string;
}

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieFormData>();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/movies/${id}`).then((res) => {
        reset(res.data);
      });
    }
  }, [id, reset]);

  const onSubmit = (data: MovieFormData) => {
    const formattedData = {
      ...data,
      year: Number(data.year),
      duration: Number(data.duration),
    };
    axios.put(`http://localhost:3000/movies/${id}`, formattedData).then(() => {
      alert("Cập nhật thành công");
      navigate("/");
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa phim</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Tên phim */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Tên phim
          </label>
          <input
            {...register("title", {
              required: "Không được để trống",
            })}
            type="text"
            id="title"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Đạo diễn */}
        <div>
          <label htmlFor="director" className="block font-medium mb-1">
            Đạo diễn
          </label>
          <input
            {...register("director", {
              required: "Không được để trống",
            })}
            type="text"
            id="director"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.director && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.director.message}
            </span>
          )}
        </div>

        {/* Năm phát hành */}
        <div>
          <label htmlFor="year" className="block font-medium mb-1">
            Năm phát hành
          </label>
          <input
            {...register("year", {
              required: "Không được để trống",
              validate: (value) => {
                if (value === "" || value === undefined || value === null) {
                  return "Không được để trống";
                }
                const num = Number(value);
                if (isNaN(num) || !Number.isInteger(num)) {
                  return "Năm phát hành phải là số nguyên hợp lệ";
                }
                return true;
              },
            })}
            type="number"
            id="year"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.year && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.year.message}
            </span>
          )}
        </div>

        {/* Thể loại */}
        <div>
          <label htmlFor="genre" className="block font-medium mb-1">
            Thể loại
          </label>
          <select
            {...register("genre", {
              required: "Không được để trống",
            })}
            id="genre"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn thể loại --</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
          {errors?.genre && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.genre.message}
            </span>
          )}
        </div>

        {/* Thời lượng */}
        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Thời lượng (phút)
          </label>
          <input
            {...register("duration", {
              required: "Không được để trống",
              validate: (value) => {
                if (value === "" || value === undefined || value === null) {
                  return "Không được để trống";
                }
                const num = Number(value);
                if (isNaN(num) || num <= 0) {
                  return "Thời lượng phim phải lớn hơn 0";
                }
                return true;
              },
            })}
            type="number"
            id="duration"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.duration && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.duration.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;

