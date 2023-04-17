"use client";
import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined;
  width? : number
  height?: number
}

const Avatar:React.FC<AvatarProps> = ({src,width,height}) => {
  return (
    <Image 
      className="rounded-full"
      src={src || "/images/profiles.png"}
      width={width}
      height={height}
      alt="Avatar"
    />
  )
}

export default Avatar
