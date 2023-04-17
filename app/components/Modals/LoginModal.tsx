"use client"
import React, { useState, useCallback } from "react";

import Modal from "../Modal";

import useLoginModel from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

import Oauth from "../Oauth";
import LoginForm from "../auth/LoginForm";


const LoginModel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModel();
  const registModel = useRegisterModal();
  
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registModel.onOpen();
  }, [loginModal, registModel, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <LoginForm />
      <Oauth />
    </div>
  );
  const footerContent = (
    <div className="text-black text-center mt-4">
      <p>
        회원이 아니십니까?
        <span
          onClick={onToggle}
          className="text-red-500 cursor-pointer hover:underline"
        >
          회원가입 go!
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      title="로그인"
      body={bodyContent}
      footer={footerContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    />
  );
};

export default LoginModel;