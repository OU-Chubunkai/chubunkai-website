import React from 'react';
import Image from 'next/image';

interface VideoHeroProps {
  videoUrl: string;
  overlayColor: string;
  title: string;
  subtitle: string;
}

const VideoHero = (props: VideoHeroProps) => {
  const { videoUrl, overlayColor, title, subtitle } = props;
  return (
    <div className="relative w-full h-50 md:h-100 overflow-hidden border-amber-800 border-4 rounded-2xl lg:rounded-4xl md:rounded-2xl sm:rounded-2xl">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: overlayColor }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 flex flex-col items-center justify-center">
        <a href='/about' className="hover:opacity-90">
          <Image
            src="/Ch_logo.jpg"
            alt="Ch_logo"
            width={120}
            height={38}
            priority
          />
        </a>
        {title && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="xl:text-[2rem] self-center font-bold text-[#fff0f0] mt-4 mb-4 lg:text-[1.6rem] md:text-[1.2rem]">{subtitle}</p>}
        {/* 必要に応じてボタンなどの他の要素を追加 */}
      </div>
    </div>
  );
};

export default VideoHero;