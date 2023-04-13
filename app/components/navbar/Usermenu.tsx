"use client"
import { useCallback, useState} from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem';
import useLoginModel from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal';

const Usermenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LoginModal = useLoginModel()
  const RegisterModal = useRegisterModal()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  },[])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transtion"
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-60 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <>
              <MenuItem onClick={LoginModal.onOpen} label="login"/>
              <MenuItem onClick={RegisterModal.onOpen} label="Sign up"/>
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default Usermenu
