"use client"
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface TagProps {
  id: number
  name: string
  onClick : (id:number) => void
}

const Tag:React.FC<TagProps> = ({id,name,onClick}) => {
  return (
    <div className="rounded-xl bg-zinc-700 text-white p-2 flex gap-2 justify-center items-center">
      {name}
      <p className='cursor-pointer' onClick={() => onClick(id)}><AiOutlineCloseCircle size={20}/></p>
    </div>
  )
}

export default Tag
