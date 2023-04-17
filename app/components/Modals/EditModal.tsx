"use client"
import React, { useState, useCallback } from "react";

import Modal from "../recycle/Modal";
import useEditModel from "../hooks/useEditModal";
import UserImageUpload from "../users/UserImageUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


import { toast } from "react-hot-toast";

async function updatePost(name: string,image: string) {
  const response = await axios.patch(`/api/edit`, {
    name,
    image
  });
  return response.data
}
const EditModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  const editModal = useEditModel()

  const queryClient = useQueryClient()

  const updatePostMutation = useMutation({
    mutationFn: () => updatePost(username,profileImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', "post"]});
      editModal.onClose();
    },
    onError : () => {
      console.log("error")
    }
  })


  const handleSubmit = useCallback(async () => {
    if(!username){
      toast.error("이름을 입력해주세요")
      return
    }
    updatePostMutation.mutate();
  }, [updatePostMutation, profileImage, username]);
  

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <UserImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="프로필 이미지"
      />
       <input 
        className="p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-6 rounded" onClick={handleSubmit}>Edit</button>
    </div>
  );
  const footerContent = (
    <div></div>
  );

  return (
    <Modal
      title="Edit"
      body={bodyContent}
      footer={footerContent}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
    />
  );
};

export default EditModal;