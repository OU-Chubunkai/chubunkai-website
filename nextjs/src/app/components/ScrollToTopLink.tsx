"use client"

import React from 'react';
import Link, { LinkProps } from 'next/link';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

const ScrollToTopLink: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0); // ページの一番上にスクロール
  };

  return (
    <Link href={href} onClick={handleClick} {...rest} className='inline-block text-[#009688] no-underline font-[bold] hover:underline'>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;