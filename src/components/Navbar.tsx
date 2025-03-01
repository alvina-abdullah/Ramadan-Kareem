"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed mx-auto top-0 z-10 w-full bg-gradient-to-r from-green-950 to-yellow-800 p-4 text-white shadow-lg ">
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
