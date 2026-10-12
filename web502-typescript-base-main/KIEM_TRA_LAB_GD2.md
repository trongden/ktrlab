# BÀI KIỂM TRA LẤY ĐIỂM LAB GIAI ĐOẠN 2 – 60 PHÚT

## React + TypeScript + Axios + JSON Server

**Thời gian:** 60 phút  
**Tổng điểm:** 10 điểm  
**Hình thức:** Thực hành cá nhân

## Đề bài

Xây dựng ứng dụng **Quản lý danh sách phim (Movies Management)** sử dụng React + TypeScript + Axios + JSON Server.

**API:** `http://localhost:3000/movies`

### Dữ liệu mẫu

Tạo file `db.json` với dữ liệu sau:

```json
{
  "movies": [
    {
      "id": "1",
      "title": "Avengers: Endgame",
      "director": "Anthony Russo",
      "year": 2019,
      "genre": "Action",
      "duration": 181
    },
    {
      "id": "2",
      "title": "Interstellar",
      "director": "Christopher Nolan",
      "year": 2014,
      "genre": "Sci-Fi",
      "duration": 169
    },
    {
      "id": "3",
      "title": "Inception",
      "director": "Christopher Nolan",
      "year": 2010,
      "genre": "Sci-Fi",
      "duration": 148
    },
    {
      "id": "4",
      "title": "The Conjuring",
      "director": "James Wan",
      "year": 2013,
      "genre": "Horror",
      "duration": 112
    },
    {
      "id": "5",
      "title": "Fast & Furious 7",
      "director": "James Wan",
      "year": 2015,
      "genre": "Action",
      "duration": 137
    }
  ]
}
```

---

## Câu 1 – Hiển thị danh sách phim (2 điểm)

Sử dụng Axios và `useEffect` để lấy danh sách phim từ API:

```http
GET /movies
```

Hiển thị danh sách phim dưới dạng bảng gồm các cột:

- STT
- Tên phim
- Đạo diễn
- Năm phát hành
- Thể loại
- Thời lượng (phút)
- Chức năng

**Yêu cầu:**

- Khai báo kiểu dữ liệu `Movie` bằng TypeScript.
- Lưu danh sách phim vào `useState`.
- Hiển thị đầy đủ dữ liệu lấy từ API.
- Hiển thị thông báo phù hợp khi danh sách phim trống.

## Câu 2 – Thêm phim mới (2 điểm)

Xây dựng form thêm phim với các trường:

- Tên phim
- Đạo diễn
- Năm phát hành
- Thể loại
- Thời lượng (phút)

Khi nhấn nút **Thêm phim**, gửi request:

```http
POST /movies
```

**Yêu cầu:**

- Kiểm tra các trường bắt buộc không được để trống.
- Năm phát hành phải là số nguyên hợp lệ.
- Thời lượng phim phải lớn hơn 0.
- Sau khi thêm thành công, cập nhật danh sách phim trên giao diện.
- Xóa dữ liệu form sau khi thêm thành công.

## Câu 3 – Sửa và xóa phim (2,5 điểm)

### a. Sửa phim (1,5 điểm)

Mỗi phim có nút **Sửa**. Khi nhấn nút này:

- Hiển thị thông tin phim hiện tại lên form.
- Cho phép chỉnh sửa các trường thông tin.
- Khi nhấn **Cập nhật**, gửi request:

```http
PUT /movies/:id
```

- Sau khi cập nhật thành công, danh sách hiển thị dữ liệu mới.
- Không tạo thêm bản ghi phim mới khi cập nhật.

### b. Xóa phim (1 điểm)

Mỗi phim có nút **Xóa**. Khi nhấn Xóa, gửi request:

```http
DELETE /movies/:id
```

**Yêu cầu:**

- Có xác nhận trước khi xóa.
- Sau khi xóa thành công, phim được loại khỏi danh sách đang hiển thị.
- Không cần tải lại trang để thấy kết quả.

## Câu 4 – Tìm kiếm phim bằng JSON Server (1,5 điểm)

Tạo ô tìm kiếm theo tên phim:

```text
[Tìm kiếm tên phim...]
```

**Yêu cầu:**

- Tìm kiếm theo trường `title` thông qua API JSON Server.
- Không sử dụng `filter()` ở React để tìm kiếm.
- Kết quả tìm kiếm được hiển thị trên bảng.
- Khi xóa nội dung tìm kiếm, hiển thị lại toàn bộ danh sách.
- Xử lý trường hợp không tìm thấy phim.

Ví dụ request:

```http
GET /movies?title_like=Avengers
```

Kết quả mong muốn: hiển thị phim **Avengers: Endgame**.

## Câu 5 – Câu nâng cao lấy điểm 10: Sắp xếp phim theo nhiều tiêu chí (2 điểm)

Bổ sung chức năng sắp xếp danh sách phim theo **năm phát hành** hoặc **thời lượng phim**.

### Giao diện

Tạo hai danh sách lựa chọn:

```text
Sắp xếp theo: [Năm phát hành ▼]
Thứ tự:       [Giảm dần ▼]
```

### Các lựa chọn

**Sắp xếp theo:**

- Năm phát hành (`year`)
- Thời lượng phim (`duration`)

**Thứ tự:**

- Tăng dần (`asc`)
- Giảm dần (`desc`)

### Yêu cầu

1. Khi người dùng thay đổi tiêu chí sắp xếp, gửi request lên JSON Server để lấy dữ liệu đã sắp xếp.
2. Khi người dùng thay đổi thứ tự tăng dần hoặc giảm dần, gửi lại request với thứ tự tương ứng.
3. Không sử dụng `sort()` ở React để sắp xếp danh sách.
4. Kết quả phải được cập nhật trên bảng mà không tải lại toàn bộ trang.
5. Khi kết hợp với tìm kiếm ở Câu 4, phải giữ điều kiện tìm kiếm và áp dụng sắp xếp trong cùng một request.
6. Mặc định sắp xếp theo năm phát hành giảm dần.
7. Xử lý đúng trường hợp API trả về danh sách rỗng.

### Ví dụ request

**Sắp xếp theo năm phát hành giảm dần:**

```http
GET /movies?_sort=year&_order=desc
```

**Sắp xếp theo thời lượng tăng dần:**

```http
GET /movies?_sort=duration&_order=asc
```

**Tìm kiếm phim có tên chứa `Fast`, sau đó sắp xếp theo thời lượng giảm dần:**

```http
GET /movies?title_like=Fast&_sort=duration&_order=desc
```

**Lưu ý:** Chức năng sắp xếp phải được thực hiện thông qua API JSON Server. Không tải toàn bộ dữ liệu về rồi tự sắp xếp bằng JavaScript ở phía React.

---

## Tổng kết điểm

| Nội dung                            |     Điểm |
| ----------------------------------- | -------: |
| Câu 1 – Hiển thị danh sách phim     |      2,0 |
| Câu 2 – Thêm phim                   |      2,0 |
| Câu 3 – Sửa và xóa phim             |      2,5 |
| Câu 4 – Tìm kiếm bằng API           |      1,5 |
| Câu 5 – Sắp xếp theo nhiều tiêu chí |      2,0 |
| **Tổng cộng**                       | **10,0** |
