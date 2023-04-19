'use client';

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface OauthProps {
  title?: string;
}

const Oauth: React.FC<OauthProps> = ({ title }) => {
  return (
    <div className="w-full text-center flex justify-center gap-4 mt-2">
      <div

        className="bg-white dark:bg-zinc-900 flex items-center justify-center gap-4  p-2 rounded-full cursor-pointer hover:shadow-md  transition"
      >
        <div onClick={() => signIn("google")}>
          <FcGoogle size={35} />
        </div>
      </div>
      <div

        className="bg-white dark:bg-zinc-900 flex items-center justify-center gap-4  p-2 rounded-full cursor-pointer hover:shadow-md  transition"
      >
        <div onClick={() => signIn("github")}>
          <AiFillGithub size={35} />
        </div>
      </div>
    </div>
  );
};

export default Oauth;
