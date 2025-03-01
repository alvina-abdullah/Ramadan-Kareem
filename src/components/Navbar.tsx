"use client";
// import React, { useState } from 'react'
// import { FaBars, FaTimes } from 'react-icons/fa'
// import { FaMoon } from 'react-icons/fa'

// const Navbar = () => {
//   const [nav, setNav] = useState(false)
  
//   const links = [
//     { id: 1, href: '/', link: 'Home' },
//     { id: 2, href: 'Prayers', link: 'Prayer Times' },
//     { id: 3, href: '/Quran', link: 'Quran' },
//     { id: 4, href: '/Duas', link: 'Duas' },
//     { id: 5, href: '/About', link: 'About' },
//   ]

//   return (
//     <nav className="flex justify-between items-center w-full h-20 px-4 bg-green-800 text-white fixed">
//       <div className="flex items-center gap-2">
//         <FaMoon size={25} />
//         <h1 className="text-2xl font-bold">Ramadan Kareem</h1>
//       </div>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex">
//         {links.map(({ id, link }) => (
//           <li
//             key={id}
//             className="px-4 cursor-pointer font-medium hover:text-green-200 duration-200"
//           >
//             {link}
//           </li>
//         ))}
//       </ul>

//       {/* Mobile Menu Icon */}
//       <div
//         onClick={() => setNav(!nav)}
//         className="cursor-pointer pr-4 z-10 md:hidden"
//       >
//         {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
//       </div>

//       {/* Mobile Menu */}
//       {nav && (
//         <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-green-800 to-green-900">
//           {links.map(({ id, link }) => (
//             <li
//               key={id}
//               className="px-4 cursor-pointer py-6 text-xl hover:text-green-200 duration-200"
//             >
//               {link}
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   )
// }

// export default Navbar




import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed mx-auto top-0 z-10 w-full bg-gradient-to-r from-green-950 to-green-800 p-4 text-white shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl font-bold">
          <span className="mr-2 text-2xl">🌙</span> Ramadan <span className="text-green-700">Kareem</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="flex items-center gap-2 hover:text-green-700">
          🕌 Home
          </Link>
          <Link href="/prayers" className="flex items-center gap-2 hover:text-green-700">
          📿 Prayer Times
          </Link>
          <Link href="/quran" className="flex items-center gap-2 hover:text-green-700">
          📖 Al-Quran
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-green-700">
          ✨ About
          </Link>
          <Link href="/duas" className="flex items-center gap-2 hover:text-green-700">
          🤲🏻 Duas
          </Link>
        </div>

        

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4  p-4 rounded-l bg-gradient-to-r from-green-950 to-green-800g">
          <Link href="/" className="hover:text-green-900">
          🕌 Home
          </Link>
          <Link href="/prayers" className="hover:text-green-700">
          📿 Prayer Times
          </Link>
          <Link href="/quran" className="hover:text-green-700">
          📖 Al-Quran
          </Link>
          <Link href="/about" className="hover:text-green-700">
          ✨ About
          </Link>
          <Link href="/duas" className="hover:text-green-700">
          🤲🏻 Duas
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;