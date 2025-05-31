'use client'
import React from 'react';
import Calendar from '@/app/components/Calendar';

export default function blog() {
  return (
    <div className="container mx-auto py-8">
      <div className='flex flex-col items-center px-2 md:px-5 py-0'>
        <div className='flex flex-col  text-[#424242] items-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full max-w-[1000px] pb-[60px] p-3 md:p-5 rounded-lg'>
          <Calendar />
        </div>
      </div>
    </div>
  );
}