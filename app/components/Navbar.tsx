import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-full h-[8vh] flex justify-between items-center text-white px-4 bg-blue-300 '>
      <Link href={"./"} className='text-2xl uppercase font-mono '>Iboytech Movie App</Link>      
        <ul className=' flex gap-2'>
          <li className=' hover:text-yellow-400 hover:underline '> <Link href={"/favorites"}>Favorites</Link> </li>
          <li><Link href={""}>Login</Link> </li>          
        </ul>      
    </div>
  )
}
