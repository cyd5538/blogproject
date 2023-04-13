"use client"
import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from "react-hot-toast";

import useLoginModel from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginModal = useLoginModel();
  const registModel = useRegisterModal();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success('회원가입이 완료되었습니다 로그인해주세요');
        registModel.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            {...register("name", { required: "이름을 입력해주세요" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,  // 이메일 검사 정규표현식
                message: "이메일 양식을 지켜주세요",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: { value: 6, message: "비밀번호는 최소 6글자 이상입니다" },
              maxLength: { value: 10, message: "비밀번호는 최대 10글자 이하입니다" },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold text-white h-16 text-lg  bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm