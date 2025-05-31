import { CiFlag1 } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

const Activity = () => {
  return (
    <div className='container max-w-[800px] md:max-w-[1200px] mx-auto'>
      <div className='flex flex-col items-center justify-center text-[3rem] mt-4 text-amber-950'>
        <CiFlag1 />
        <h2 className='text-[2rem] font-bold text-center mt-0 mb-6 border-b-4'>活動内容</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
        <div className='container text-black max-w-[800px] md:max-w-[1200px] mx-auto text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] my-4 px-5 py-[20px] rounded-xl overflow-x-auto border-2'>
          <div className='text-[2rem] place-items-center mt-4'>
          <div className="">
              <h1 className="text-4xl pl-2 font-light pb-2">漢詩の世界を知る</h1>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
                <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">詩経</p>
                <p className="text-sm md:text-base">　中国最古の詩集『詩経』は、古代の歌謡305編から当時の生活や感情を伝えます。サークルでは、この詩の現代語訳や背景にある情景をメンバーと考察します。言葉を手がかりに、古代の人々の暮らしや想いを共有し、想像力を深める活動です。</p>
              </div>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
                <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">活動日</p>
                <p className="text-sm md:text-base">木曜日12:40〜13:20<br></br>月に一度 豊中キャンパス18:30～19:45</p>
              </div>
            </div>
          </div>
        </div>

        <div className='container text-black max-w-[800px] md:max-w-[1200px] mx-auto text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] my-4 px-5 py-[20px] rounded-xl overflow-x-auto border-2'>
          <div className='text-[2rem] place-items-center mt-4'>
          <div className="">
              <h1 className="text-4xl pl-2 font-light pb-2">古代思想を探求</h1>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
                <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">諸子百家</p>
                <p className="text-sm md:text-base">　春秋戦国時代、多様な学派を形成した諸子百家。著作を現代語訳し、当時の社会情勢と合わせて思想の背景や影響を考察・議論します。深く掘り下げ、現代にも通じる思想を深く理解することを目指します。</p>
              </div>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
              <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">活動日</p>
                <p className="text-sm md:text-base">木曜日12:40〜13:20</p>
              </div>
            </div>
          </div>
        </div>

        <div className='container text-black max-w-[800px] md:max-w-[1200px] mx-auto text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] my-4 px-5 py-[20px] rounded-xl overflow-x-auto border-2'>
          <div className='text-[2rem] place-items-center mt-4'>
          <div className="">
              <h1 className="text-4xl pl-2 font-light pb-2">現代漢語による探究</h1>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
                <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">音韻</p>
                <p className="text-sm md:text-base">　現代中国語で古代中国の文章を読解。漢字は同じでも発音は変化します。この音の変化に想いを馳せつつ、現代語で古典の意味を探求。言葉の奥深さ、時間による変化を通して新たな発見を目指します。</p>
              </div>
              <div className="text-sm border-l-4 bg-gray-200 p-2 text-left my-2">
              <FaBookmark className="float-left overflow-hidden text-xl pr-1 ml-1" /><p className="text-xl font-bold">活動日</p>
                <p className="text-sm md:text-base">毎回、実施</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Activity;