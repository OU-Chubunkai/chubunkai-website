const Introduce = () => {
  return (
    <div className='container max-w-[800px] md:max-w-[1200px] mx-auto'>
      <div className='grid justify-items-center text-left text-black grid-cols-1 md:grid-cols-3 gap-6'>
        {/* 1つ目のアイテム */}
        <div>
          <h1 className="pl-2 text-4xl font-light pb-2">中国文学の深淵に触れる</h1>
          <p className="text-sm md:text-base text-gray-600">　中国文学作品や古典文化をじっくり学び、豊かな教養と文学的素養を身につけられます。古代から現代までの珠玉の作品群を通じて、新たな世界観や感性が磨かれるでしょう。</p>
        </div>

        {/* 2つ目のアイテム */}
        <div>
          <h1 className="pl-2 text-4xl font-light pb-2">多様な交流が生む学び</h1>
          <p className="text-sm md:text-base text-gray-600">　多くの留学生が参加しており、キャンパスを越えて様々な学部・学科の学生が集まります。異なるバックグラウンドを持つ仲間との交流は、多角的な視点を与え、あなたの学びを一層深めます。</p>
        </div>

        {/* 3つ目のアイテム */}
        <div>
          <h1 className="pl-2 text-4xl font-light pb-2">柔軟な参加スタイルと実践</h1>
          <p className="text-sm md:text-base text-gray-600">　掛け持ち自由なので、自分のペースで無理なく活動に参加できます。活発な議論や交流は、中国語学習の実践の場としても最適。文学への探求心と語学力、両方を高められます。</p>
        </div>
      </div>
    </div>
  );
};

export default Introduce;