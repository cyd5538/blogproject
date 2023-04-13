import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


interface OauthProps {
  title?: string;
}

const Oauth: React.FC<OauthProps> = ({ title }) => {
  return (
    <div className="w-full text-center flex justify-center gap-4 mt-2">
      <div

        className="flex items-center justify-center gap-4 border-2 p-2 rounded-full  border-green-900 cursor-pointer hover:shadow-md hover:border-black transition"
      >
        <div>
          <FcGoogle size={35} />
        </div>
      </div>
      <div

        className="flex items-center justify-center gap-4 border-2 p-2 rounded-full  border-green-900 cursor-pointer hover:shadow-md hover:border-black transition"
      >
        <div>
          <AiFillGithub size={35} />
        </div>
      </div>
    </div>
  );
};

export default Oauth;
