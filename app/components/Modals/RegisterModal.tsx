"use client"

import React, { useState, useCallback } from "react";


import Modal from "../recycle/Modal";

import useLoginModel from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

import RegisterForm from '../auth/RegisterForm'
import Oauth from "../recycle/Oauth";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModel();
  const registModel = useRegisterModal();

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onOpen();
    registModel.onClose();
  }, [loginModal, registModel, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <RegisterForm />
      <Oauth />
    </div>
  );

  const footerContent = (
    <div className="text-black text-center ">
      <p>
        회원이십니까?
        <span
          onClick={onToggle}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Login go!
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      title="회원가입"
      body={bodyContent}
      footer={footerContent}
      isOpen={registModel.isOpen}
      onClose={registModel.onClose}
    />
  );
};

export default RegisterModal;