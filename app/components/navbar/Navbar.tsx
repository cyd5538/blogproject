"use client"
import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermenu from './Usermenu'

import { User } from '../types'

import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser? : User | null;
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  const router = useRouter();
  return (
    <div className='w-full bg-white z-10 shadow-sm'>
      <div
      className='py-4 border-b-[1px]'
      >
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <div className='flex gap-4 items-center justify-center'>
              <Search />
              <Usermenu currentUser={currentUser}/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
