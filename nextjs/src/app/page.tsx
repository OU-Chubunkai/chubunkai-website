import Calendar_top from "./components/Calendar_top";
import BlogNewPosts from "./components/BlogNewPosts";
import VideoHero from "./components/VideoHero";
import Introduce from "./components/Introduce";
import Activity from "./components/Activity";
import Place from "./components/Place";

export default function Home() {
  return (
    <div className="grid grid-rows-1fr items-center justify-items-center min-h-screen p-2 py-4 md:p-4 pb-20 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto flex flex-col gap-[30px] row-start-2 items-center sm:items-start">
        <VideoHero
          videoUrl='https://nextcloud.cpop-to-tyuugokubunka.org/s/jwy4XsCM2a3p9aY/download/magical-animation-_1_.mp4'
          overlayColor='rgba(0, 0, 0, 0.5)'
          subtitle='「中国文学を一から」' title={""}        />
        <Introduce />
        <Activity />
        <Place />
        <Calendar_top />
        <BlogNewPosts page={1} limit={3} headline={'最新情報'}/>
      </main>
    </div>
  );
}
