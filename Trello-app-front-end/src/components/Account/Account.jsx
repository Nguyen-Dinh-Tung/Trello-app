import jwt_decode from "jwt-decode";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import getImageUser from "../../api/GetImageUser";
import { Formik } from "formik";
import * as Yup from "yup";

import { storage } from "../UpLoadImg/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import UploadAvatar from "../../api/UpLoadAvatar";
import Swal from "sweetalert2";
import reSetPass from "../../api/ConfirmPassWord";
import { Loading2 } from "../../components/Loading/Loading2";
import { Loading3 } from "../Loading/Loading3";

const UpdateSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Mật khẩu không được để trống !"),
  password: Yup.string().required("Mật khẩu không được để trống !"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp !")
    .required("Mật khẩu không được để trống !"),
});

export default function Account() {
  const isLogin = localStorage.getItem("token");
  const [avatar, setAvatar] = useState(false);
  const [valueAvatar, setValueAvatar] = useState();
  const [Upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState();
  const [showModal, setShowModal] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const [errOldPass, setErrOldPass] = useState(false);
  const [valueErr, setValueErr] = useState();
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [showEyeOld, setShowEyeOld] = useState(false);
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [showEyeNew, setShowEyenew] = useState(false);
  const [newConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const [showEyeCf, setShowEyeCf] = useState(false);
  const [loadingRspw, setLoadingRSPW] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading3avatar, setLoading3Avatrt] = useState(false);

  const handleShowPass = () => {
    if (oldPasswordType === "password") {
      setOldPasswordType("text");
      setShowEyeOld(true);

      return;
    }
    setShowEyeOld(false);
    setOldPasswordType("password");
  };

  const handleShowNewPass = () => {
    if (newPasswordType === "password") {
      setNewPasswordType("text");
      setShowEyenew(true);

      return;
    }
    setShowEyenew(false);
    setNewPasswordType("password");
  };
  const handleShowCfPass = () => {
    if (newConfirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setShowEyeCf(true);

      return;
    }
    setShowEyeCf(false);
    setConfirmPasswordType("password");
  };
  useEffect(() => {
    let timeId = setTimeout(() => {
      setLoading3(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [loading3]);
  useEffect(() => {
    let timeAvatart = setTimeout(() => {
      setLoading3Avatrt(false);
    }, 3000);

    return () => {
      clearTimeout(timeAvatart);
    };
  }, [loading3avatar]);

  let decode;
  let str = "";
  if (isLogin) {
    decode = jwt_decode(isLogin);
    str = decode.name;
    str.split(" ");
  }
  useEffect(() => {
    getImageUser(decode.id)
      .then((res) => {
        if (res.data.message === "Không có ảnh!") {
          setAvatar(false);
        } else if (res.data.message === "Unauthorized access.") {
          setAvatar(false);
        } else {
          setValueAvatar(res.data.message);
          setAvatar(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [flag]);

  const imageRef = useRef(null);

  function useDisplayImage() {
    const [result, setResult] = useState(false);

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();
  const handleUpload = () => {
    setLoading(true);

    const imageRef = ref(storage, `case6/${Upload?.name}`);
    uploadBytes(imageRef, Upload).then((snaphost) => {
      console.log(
        "🚀 ~ file: Profile.jsx ~ line 41 ~ uploadBytes ~ Upload",
        Upload
      );
      getDownloadURL(snaphost.ref).then((url) => {
        console.log(url);
        UploadAvatar({
          id: decode.id,
          image: url,
        })
          .then((res) => {
            console.log(res);
            setLoading(false);
            setLoading3Avatrt(true);

            setFlag(res);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });
  };
  const handleResetPas = () => {
    setShowModal(true);
  };

  return (
    <div>
      {loading3 ? <Loading3 message="Thay đổi mật khẩu thành công !" /> : null}

      {loading3avatar ? <Loading3 message="Thay đổi ảnh thành công !" /> : null}

      <div className="w-full h-screen bg-gray-50  leading-5 flex flex-col   ">
        <div className="flex flex-row justify-center py-0 mx-48">
          <div className=" flex my-12 ">
            <span
              className="flex flex-row gap-3 items-center  text-center rounded-full "
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {avatar ? (
                <div>
                  <img
                    className="h-24 w-24 md rounded-full relative "
                    src={valueAvatar}
                    alt
                  />
                </div>
              ) : (
                <div>
                  <i class="fa-sharp fa-solid fa-user-ninja fa-2xl"></i>
                </div>
              )}
              <span className="text-2xl font-semibold  ">{str}</span>
            </span>
          </div>
        </div>

        <div>
          <div>
            <div className=" block md:flex mx-auto w-[70%] gap-12">
              <div className="w-full md:w-2/5 p-4 sm:p-6 shadow bg-white">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full" />
                    <div className="w-8 h-8 bg-green-400 rounded-full" />
                    <div className="w-8 h-8 bg-black rounded-full" />
                  </div>
                ) : (
                  <div className="w-full p-8 mx-2 flex justify-center">
                    {result ? (
                      <img
                        ref={imageRef}
                        src={result}
                        className="max-h-[75%] max-w-[75%]"
                        alt=""
                      />
                    ) : (
                      <img src={Upload?.image} ref={imageRef} alt="" />
                    )}
                  </div>
                )}

                <div className=" ml-2 rounded-md border-gray-700 dark:text-gray-900">
                  <input
                    type="file"
                    name="image"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(event) => {
                      setUpload(event.target.files[0]);
                      uploader(event);
                    }}
                  />
                  <div className="flex flex-col items-center gap-3">
                    <label
                      htmlFor="file-upload"
                      className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer hover:text-red-800"
                    >
                      <p className="z-10 text-lg font-light text-center text-gray-700">
                        Tải ảnh lên
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6  "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </label>
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={handleUpload}
                    >
                      LƯU
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 p-8 bg-white shadow lg:ml-4 justify-items-center items-center">
                <div className="rounded p-auto  justify-items-center items-center block">
                  <div className="pb-6">
                    <label
                      htmlFor="name"
                      className="font-semibold text-gray-700 block pb-1"
                    >
                      Tên
                    </label>
                    <div className="flex">
                      <input
                        disabled
                        id="username"
                        value={decode.name}
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        defaultValue="Jane Name"
                      />
                    </div>
                  </div>
                  <div className="pb-4">
                    <label
                      htmlFor="about"
                      className="font-semibold text-gray-700 block pb-1"
                    >
                      Email
                    </label>
                    <input
                      disabled
                      value={decode.email}
                      id="email"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="email"
                      defaultValue="example@example.com"
                    />
                  </div>
                  <div className="pb-4">
                    <label
                      htmlFor="about"
                      className="font-semibold text-gray-700 block pb-1"
                    >
                      Mật khẩu
                    </label>
                    <input
                      disabled
                      value="*******"
                      id="password"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="password"
                      defaultValue="example@example.com"
                    />
                  </div>
                  <button
                    onClick={handleResetPas}
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Thay đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed visible inset-0 z-50  ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold ">Thay đổi mật khẩu</h3>
                  <a
                    onClick={() => {
                      setShowModal(false);
                      setErrOldPass(false);
                    }}
                  >
                    <i class="fa-solid fa-x"></i>
                  </a>
                </div>
                {/*body*/}
                <div
                  className="relative p-6 flex-auto"
                  style={{ width: "600px" }}
                >
                  {errOldPass ? (
                    <div>
                      {" "}
                      <div
                        className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
                        role="alert"
                      >
                        <svg
                          className="w-5 h-5 inline mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <span className="font-medium">{valueErr}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <Formik
                    initialValues={{
                      id: decode.id,
                      oldPassword: "",
                      password: "",
                      confirmpassword: "",
                    }}
                    validationSchema={UpdateSchema}
                    onSubmit={(values, { resetForm }) => {
                      setLoadingRSPW(true);
                      setErrOldPass(false);
                      reSetPass(values)
                        .then((res) => {
                          setLoadingRSPW(false);
                          if (
                            res.data.message ===
                            "Sai mật khẩu cũ, Mời nhật lại !"
                          ) {
                            setValueErr(res.data.message);
                            setErrOldPass(true);
                          } else {
                            setShowModal(false);
                            setLoading3(true);
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      isValidating,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <form
                        novalidate=""
                        action=""
                        className="space-y-12 ng-untouched ng-pristine ng-valid"
                      >
                        <div className="space-y-4  ">
                          <div className="m-2">
                            <div className="hidden">
                              <label for="id" className="block mb-2 text-sm">
                                Id
                              </label>
                              <input
                                type="text"
                                name="id"
                                value={decode.id}
                                onChange={handleChange}
                                id="first name"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-700  dark:text-gray-900"
                              />
                            </div>
                            <div className=" content-center">
                              <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Mật khẩu cũ
                              </label>
                              <div className="grid grid-cols-12">
                                <div className="col-span-11">
                                  <input
                                    className="w-full content-center text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-indigo-500"
                                    type={oldPasswordType}
                                    name="oldPassword"
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu cũ"
                                  />
                                </div>

                                <div
                                  onClick={handleShowPass}
                                  className="col-span-1"
                                >
                                  {/* <i className="fa-solid fa-eye"></i> */}
                                  {showEyeOld ? (
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
                              {errors.oldPassword && touched.oldPassword ? (
                                <div style={{ color: "red" }}>
                                  {errors.oldPassword}
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-4 content-center">
                              <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Mật khẩu mới
                              </label>
                              <div className="grid grid-cols-12">
                                <div className="col-span-11">
                                  <input
                                    className="w-full content-center text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-indigo-500"
                                    type={newPasswordType}
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu mới"
                                  />
                                </div>

                                <div
                                  onClick={handleShowNewPass}
                                  className="col-span-1"
                                >
                                  {/* <i className="fa-solid fa-eye"></i> */}
                                  {showEyeNew ? (
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
                              {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-4 content-center">
                              <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Nhập lại mật khẩu mới
                              </label>
                              <div className="grid grid-cols-12">
                                <div className="col-span-11">
                                  <input
                                    className="w-full content-center text-base py-2 border-b text-black border-gray-300 focus:outline-none focus:border-indigo-500"
                                    type={newConfirmPasswordType}
                                    name="confirmpassword"
                                    onChange={handleChange}
                                    placeholder="Nhập mật lại khẩu mới"
                                  />
                                </div>

                                <div
                                  onClick={handleShowCfPass}
                                  className="col-span-1"
                                >
                                  {/* <i className="fa-solid fa-eye"></i> */}
                                  {showEyeCf ? (
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
                              {errors.confirmpassword &&
                              touched.confirmpassword ? (
                                <div style={{ color: "red" }}>
                                  {errors.confirmpassword}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 ml-2">
                          <div>
                            {loadingRspw ? (
                              <Loading2 />
                            ) : (
                              <button
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={handleSubmit}
                                type="submit"
                              >
                                LƯU
                              </button>
                            )}
                            <button
                              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                setErrOldPass(false);
                              }}
                            >
                              ĐÓNG
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
