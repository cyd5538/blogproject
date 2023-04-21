"use client";
import React, { useEffect, useState } from 'react'
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { useParams } from 'next/navigation';

interface BlogShareProps {
  title : string | undefined
}

const BlogShare:React.FC<BlogShareProps> = ({title}) => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const params = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API as string);
      setIsKakaoInitialized(true);
    };
  }, []);

  const handleShareButtonClick = () => {
    if (isKakaoInitialized) {
      (window as any).Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          imageUrl: "",
          description: "",
          link: {
            mobileWebUrl: `http://localhost:3000/post/${params?.slug}`,
            webUrl: `http://localhost:3000/post/${params?.slug}`,
          },
        },
        buttons: [
          {
            title: `http://localhost:3000/post/${params?.slug}`,
            link: {
              mobileWebUrl: `http://localhost:3000/post/${params?.slug}`,
            },
          },
        ],
      });
    }
  };

  const twiiterShare = () => {
    let twitterUrl = `https://twitter.com/intent/tweet?url=http://localhost:3000/post/${params?.slug}`;
    window.open(twitterUrl, "_blank")
  }

  return (
    <div className="mb-6 flex gap-4 w-full justify-end mt-4">
      <div
        onClick={handleShareButtonClick}
        className="flex bg-yellow-400 items-center justify-center gap-4 p-[4px] rounded-full cursor-pointer shadow-md hover:shadow-xl transition"
      >
        <button>
          <RiKakaoTalkFill size={25} />
        </button>
      </div>
      <div 
        onClick={twiiterShare}
        className="flex bg-white items-center justify-center gap-4 p-[4px] rounded-full cursor-pointer shadow-md hover:shadow-xl transition">
        <button>
          <FaTwitter color="#7f79d5" size={25} />
        </button>
      </div>
    </div>
  )
}

export default BlogShare
