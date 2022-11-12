import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import register from "../../api/Register";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password done not match !")
    .required("Required"),
});

export default function Register() {
  let navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [ConfirmPasWordType, setConfirmPasWordType] = useState("password");
  const [showEye, setShowEye] = useState(false);
  const [showEyeConfirmPass, setShowEyeConfirmPass] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowPass = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowEye(true);

      return;
    }
    setShowEye(false);
    setPasswordType("password");
  };
  const handleShowConfirmPass = () => {
    if (ConfirmPasWordType === "password") {
      setConfirmPasWordType("text");
      setShowEyeConfirmPass(true);

      return;
    }
    setShowEyeConfirmPass(false);
    setConfirmPasWordType("password");
  };

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://img3.thuthuatphanmem.vn/uploads/2019/06/08/anh-nen-mua-dong-dep_024452709.jpg)",
        }}
      >
        {loading ? (
          <div>
            <div className="w-24 h-24 animate-spin rounded-full border-8 border-blue-500 border-b-transparent" />
          </div>
        ) : (
          <>
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
              <div className="text-center">
                <h1 className="mt- text-3xl font-bold text-blue-500">
                  Đăng Ký
                </h1>
              </div>
              <span className="h-px w-16 bg-gray-300" />
              {errorsMessage ? (
                <div className="flex w-full px-6 py-4 my-2 rounded-xl shadow-md font-semibold text-md bg-white text-red-700">
                  <span className="h-6 w-6 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </span>
                  {errorsMessage}
                  <button className="h-6 w-6 ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  let data = {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                    confirmpassword: values.confirmpassword,
                  };
                  console.log(data);
                  setLoading(true);
                  register(data)
                    .then((res) => {
                      setLoading(false);
                      let data = res.data.message;
                      if (data === "Email đã tồn tại !") {
                        setErrorsMessage(data);
                      } else {
                        Swal.fire("Đăng ký tài khoản thành công !").then(
                          (result) => {
                            navigate("/login");
                          }
                        );
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                {({ errors, touched, handleChange, handleSubmit }) => (
                  <form className="mt-8 space-y-6">
                    <div className="relative">
                      <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Họ và tên
                      </label>
                      <input
                        className=" w-full text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-blue-500"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="nguyenvana"
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </div>
                    <div className="relative">
                      <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Địa chỉ email
                      </label>
                      <input
                        className=" w-full text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-blue-500"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="abc@gmail.com"
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="mt-8 content-center">
                      <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Mật khẩu
                      </label>
                      <div className="">
                        <div className="flex flex-row">
                          <input
                            className="w-full content-center text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-blue-500"
                            type={passwordType}
                            name="password"
                            onChange={handleChange}
                            placeholder="********"
                          />
                          <div onClick={handleShowPass} className="col-span-1">
                            {showEye ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="mt-8 content-center">
                      <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Nhập lại mật khẩu
                      </label>
                      <div className="">
                        <div className="flex flex-row">
                          <input
                            className="w-full content-center text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:borde-blue-500"
                            type={ConfirmPasWordType}
                            name="confirmpassword"
                            onChange={handleChange}
                            placeholder="********"
                          />
                          <div
                            onClick={handleShowConfirmPass}
                            className="col-span-1"
                          >
                            {/* <i className="fa-solid fa-eye"></i> */}
                            {showEyeConfirmPass ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.confirmpassword && touched.confirmpassword ? (
                        <div style={{ color: "red" }}>
                          {errors.confirmpassword}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-1/2 mx-auto flex justify-center bg-blue-500 text-white p-2  rounded tracking-wide
                          font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                      >
                        Đăng ký
                      </button>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                      <span>Bạn đã có tài khoản rồi !</span>
                      <a
                        href="/login"
                        className="text-blue-500 no-underline hover:text-blue-500 hover:underline cursor-pointer transition ease-in duration-300"
                      >
                        Đăng nhập
                      </a>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </>
        )}
      </div>
    </>
  );
}