import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number | string;
  title: string;
  director: string;
  year: number;
  genre: string;
  duration: number;
}

function ListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // === CÂU 4: State tìm kiếm ===
  const [searchTerm, setSearchTerm] = useState<string>("");

  // === CÂU 5: State sắp xếp theo nhiều tiêu chí ===
  const [sortBy, setSortBy] = useState<string>("year");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const navigate = useNavigate();

  // === CÂU 1, CÂU 4 & CÂU 5: Hàm gọi API lấy danh sách, áp dụng Tìm kiếm (?title_like=) và Sắp xếp (?_sort=&_order=) ===
  function getMovies(search = "", sort = sortBy, order = sortOrder) {
    let url = `http://localhost:3000/movies?_sort=${sort}&_order=${order}`;
    if (search.trim() !== "") {
      url += `&title_like=${encodeURIComponent(search.trim())}`;
    }
    axios.get(url).then((res) => {
      setMovies(res.data);
    });
  }

  useEffect(() => {
    getMovies(searchTerm, sortBy, sortOrder);
  }, [searchTerm, sortBy, sortOrder]);

  // === CÂU 3b: Xóa phim ===
  function deleteMovies(id: number | string) {
    if (window.confirm("Bạn có muốn xóa không?")) {
      axios.delete(`http://localhost:3000/movies/${id}`).then(() => {
        getMovies(searchTerm, sortBy, sortOrder);
      });
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">Danh sách phim</h1>
        <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit font-medium"
        >
          + Thêm phim mới
        </button>
      </div>

      {/* Tìm kiếm & Sắp xếp */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* === CÂU 4: GIAO DIỆN Ô TÌM KIẾM PHIM === */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm phim (Câu 4)
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tên phim..."
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* === CÂU 5: GIAO DIỆN SẮP XẾP THEO NHIỀU TIÊU CHÍ === */}
        <div className="w-full md:w-2/3 flex flex-wrap gap-4 items-center md:justify-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sắp xếp theo (Câu 5)
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="year">Năm phát hành</option>
              <option value="duration">Thời lượng phim</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thứ tự (Câu 5)
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                STT
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên phim
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Đạo diễn
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Năm phát hành
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Thể loại
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Thời lượng (phút)
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            {movies.length > 0 ? (
              movies.map((item: Movie, index: number) => {
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 font-medium">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.director}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.year}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.genre}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.duration}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 space-x-2">
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        onClick={() => navigate(`/edit/${item.id}`)}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={() => deleteMovies(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 border border-gray-300 text-center text-gray-500"
                >
                  Không tìm thấy phim phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;



