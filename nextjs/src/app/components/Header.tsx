'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // スクロールでメニューを閉じるためのuseEffect
  useEffect(() => {
    const handleScroll = () => {
      // isOpenがtrueの場合のみ閉じる処理を実行
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // ウィンドウにスクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数: コンポーネントがアンマウントされるときにリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <header className="bg-amber-950 text-white py-4 relative">
      <div className="container mx-auto flex items-center justify-between pl-4 pr-4">
        {/* Added z-index to ensure logo is above mobile menu */}
        <Link href="/" className="text-xl font-bold z-20">
          大阪大学中文会
        </Link>

        {/* Hamburger Menu Button (Visible on mobile, hidden on medium screens and up) */}
        {/* Added z-index */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none z-20"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              // Close icon (X)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            )}
          </svg>
        </button>

        {/* Desktop Navigation (Visible on medium screens and up, hidden on mobile) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="hover:text-blue-200 font-bold">
                サークル紹介
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-blue-200 font-bold">
                カレンダー
              </Link>
            </li>
            <li>
              <Link href="/blog" className=" hover:text-blue-200 font-bold">
                ブログ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-200 font-bold">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu (Displayed absolutely below header on mobile when isOpen is true) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#f8e8e8] shadow-md transition-all duration-300 ease-in-out ${
          // Changed z-10 to z-50 to ensure it stacks above page content
          isOpen ? 'block opacity-100 z-50' : 'hidden opacity-0 z-50'
        }`}
      >
        <ul className="flex flex-col space-y-2 py-2">
          <li>
            <Link href="/about" className="block px-4 py-2 hover:bg-amber-800 text-amber-950  font-bold" onClick={toggleMenu}> {/* Close menu on click */}
              サークル紹介
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="block px-4 py-2 hover:bg-amber-800 text-amber-950 font-bold" onClick={toggleMenu}> {/* Close menu on click */}
              カレンダー
            </Link>
          </li>
          <li>
            <Link href="/blog" className="block px-4 py-2 hover:bg-amber-800 text-amber-950 font-bold" onClick={toggleMenu}> {/* Close menu on click */}
              ブログ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block px-4 py-2 hover:bg-amber-800 text-amber-950 font-bold" onClick={toggleMenu}> {/* Close menu on click */}
              お問い合わせ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;