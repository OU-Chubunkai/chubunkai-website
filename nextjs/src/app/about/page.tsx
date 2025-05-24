import Image from "next/image";
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './page.module.css';

export default function AboutPage() {
    return (
      <div className="container mx-auto py-8">
        <div className='flex flex-col items-center px-5 py-0'>
          <div className='flex flex-col  text-[#424242] items-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full max-w-[1000px] pb-[30px] p-5 rounded-lg'>
            <h1 className='text-[2rem] text-[#424242] mt-[30px]'>サークル紹介</h1>
            <Image
              src="/Ch_logo.jpg"
              alt="Ch_logo"
              width={120}
              height={38}
              priority
              className='mt-8 mb-6 border-amber-950 border-1'
            />
            <div className={styles.socialLinks}>
              <div className={styles.tooltipWrapper} data-tooltip="Instagramを開く">
                <a href="https://www.instagram.com/ou_chubunkai/" title="Instagramを開く" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className={styles.socialIcon} />
                </a>
              </div>
              {/* 必要に応じて他のソーシャルメディアリンクを追加 */}
            </div>
            <div className='text-[0.9rem] md:text-[1rem] text-[#777] text-left;'>
              <p className='mb-6'><strong>中国文学の奥深い魅力に触れませんか？</strong></p>
              <p className='mb-6'>　　「中国文学同好会」では、中国文学の世界をじっくりと探求できます。古代から現代までの名作を通して、豊かな教養と新たな感性を磨きませんか？</p>
            </div>
          </div>
        </div>
      </div>
    );
  }