"use client"
import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermenu from './Usermenu'

import { User } from '../types'

import { useRouter } from "next/navigation";
import DarkMode from './DarkMode'

interface NavbarProps {
  currentUser? : User | null;
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {

  return (
    <div className='w-full bg-white dark:bg-zinc-900 dark:text-white z-10 shadow-sm'>
      <div
      className='py-4 '
      >
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <div className='flex gap-4 items-center justify-center'>
              <Search />
              <DarkMode />
              <Usermenu currentUser={currentUser}/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
