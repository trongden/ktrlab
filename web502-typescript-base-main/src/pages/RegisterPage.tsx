import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}
interface RegisterResponse {
    accessToken: string;
    user?: {
        id: string | number;
        email: string;
        username?: string;
    }
}

function RegisterPage() {
    const [message, setMassage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setMassage("");
        setIsSuccess(false);

        try {
            const response = await axios.post<RegisterResponse>(
                "http://localhost:3000/register",
                {
                    username: data.username.trim(),
                    email: data.email.trim().toLowerCase(),
                    password: data.password,
                },
            );
            console.log("Register response:", response.data);
            setIsSuccess(true);
            setMassage("Đăng ký thành công");
            reset();
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response?.status === 400){
                    setMassage("Dữ liệu không hợp lệ")
                } else{
                    setMassage("Đăng ký thất bại")
                }
            }else{
                setMassage("Có lỗi xảy ra")
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
      <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Họ và tên */}
        <div style={{ marginBottom: 16 }}>
          <label>Họ và tên</label>

          <input
            {...register("username", {
              required: "Vui lòng nhập họ và tên",
              minLength: {
                value: 2,
                message: "Họ tên phải có ít nhất 2 ký tự",
              },
            })}
            placeholder="Nhập họ và tên"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>

          <input
            type="email"
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
          <label>Mật khẩu</label>

          <input
            type="password"
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

        {/* Xác nhận mật khẩu */}
        <div style={{ marginBottom: 16 }}>
          <label>Xác nhận mật khẩu</label>

          <input
            type="password"
            {...register("confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
            })}
            placeholder="Nhập lại mật khẩu"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 6,
              boxSizing: "border-box",
            }}
          />

          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Thông báo kết quả */}
        {message && (
          <p
            role={isSuccess ? "status" : "alert"}
            style={{
              color: isSuccess ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 12,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
        <p className="mt-6">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
    </div>
    );
}
export default RegisterPage