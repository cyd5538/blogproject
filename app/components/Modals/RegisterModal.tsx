"use client"

import React, { useState, useCallback } from "react";

import Modal from "./Modal";

import useLoginModel from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

import Input from "../recycle/Input";
import Oauth from "../recycle/Oauth";
import Button from "../recycle/Button";

const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Oauth />
      <Button title="회원가입" onClick={() => {}}/>
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
      title="회원가입"
      body={bodyContent}
      footer={footerContent}
      isOpen={registModel.isOpen}
      onClose={registModel.onClose}
    />
  );
};

export default RegisterModal;