"use client"
import { useCallback, useState, useEffect, useRef} from 'react';
import {AiOutlineMenu} from 'react-icons/ai'

import Avatar from '../Avatar'
import MenuItem from './MenuItem';
import { User } from '../types'
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from "next/link"
import useLoginModel from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal';


interface UsermenuProps {
  currentUser? : User | null;
}

const Usermenu:React.FC<UsermenuProps> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const LoginModal = useLoginModel()
  const RegisterModal = useRegisterModal()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  },[])

    
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transtion"
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div ref={modalRef} className='absolute z-10 rounded-xl shadow-md w-[40vw] md:w-60 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? 
            <>
              <Link href="/">
                <MenuItem onClick={() => setIsOpen(false)} label="프로필 수정"/>
              </Link>
              <Link href="/mypost">
                <MenuItem onClick={() => setIsOpen(false)} label="내 글 보기"/>
              </Link>
              <Link href="/post">
                <MenuItem onClick={() => setIsOpen(false)} label="글 쓰기"/>
              </Link>
              <MenuItem onClick={() => signOut()} label="로그아웃"/>
            </> : 
            <>
              <MenuItem onClick={LoginModal.onOpen} label="login"/>
              <MenuItem onClick={RegisterModal.onOpen} label="Sign up"/>
            </>  
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Usermenu
