import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: string | number;
  email: string;
  fullName?: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

function LoginPage() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/login",
        {
          email: data.email.trim().toLowerCase(),
          password: data.password,
        },
      );

      const { accessToken, user } = response.data;

      if (!accessToken || !user?.id || !user?.email) {
        setMessage("API không trả về đầy đủ thông tin đăng nhập.");
        return;
      }

      // Lưu Token và thông tin người dùng.
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setIsSuccess(true);
      setMessage("Đăng nhập thành công!");

      reset();

      // Đăng nhập thành công thì chuyển đến trang chủ "/".
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          setMessage("Email hoặc mật khẩu không chính xác.");
        } else {
          setMessage("Đăng nhập thất bại. Vui lòng kiểm tra kết nối API.");
        }
      } else {
        setMessage("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 12,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
            placeholder="Nhập email"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Mật khẩu</label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
            placeholder="Nhập mật khẩu"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Thông báo kết quả */}
        {message && (
          <p
            role={isSuccess ? "status" : "alert"}
            style={{ color: isSuccess ? "green" : "red" }}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 12,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;