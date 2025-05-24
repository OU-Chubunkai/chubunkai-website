'use client'
import React, { useState } from 'react'; // useState をインポートします
import { FaRegCompass } from "react-icons/fa";

const Place = () => {
  // ここに2つのキャンパスのGoogle Map埋め込み用URLを設定してください。
  // Google Mapsを開き、場所を検索 -> 「共有」-> 「地図を埋め込む」で取得できます。
  const mapUrls = [
    process.env.GOOGLE_MAP_API_URL + "&q=大阪大学 豊中キャンパス",
    process.env.GOOGLE_MAP_API_URL + "&q=大阪大学 箕面キャンパス" 
  ];

  // 現在表示するMapのURLのインデックスを管理するstateを作成します。
  // 初期値として、どちらかのキャンパス（例: 0番目のキャンパス）を表示します。
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 現在のstateに基づいて表示するMapのURLを取得します。
  const currentMapUrl = mapUrls[selectedIndex];

  return (
    <div className='container max-w-[800px] md:max-w-[1200px] mx-auto'>
      {/* ヘッダー部分 */}
      <div className='flex flex-col place-items-center mt-4 text-amber-950'> {/* アイコンとテキストを中央揃えにするためにflex-colを使用 */}
        <FaRegCompass className="text-[3rem]" /> {/* アイコンのサイズを直接指定 */}
        {/* mbを増やし、境界線の色をアイコンと合わせました */}
        <h2 className='text-[2rem] font-bold text-center mt-2 mb-6 border-b-4 border-amber-950'>活動場所</h2>
      </div>

      {/* Google Map 埋め込み部分 */}
      <div className="mx-10">
        <iframe
          className="border-2 border-amber-950 rounded-xl w-full h-[480px] md:h-[600px]" // 高さを調整し、レスポンシブに対応
          src={currentMapUrl} // stateに応じてsrcを動的に変更
          loading="lazy" // 遅延ロードを設定（パフォーマンス向上）
          referrerPolicy="no-referrer-when-downgrade" // セキュリティポリシー
        >
        </iframe>
      </div>

      {/* キャンパス切り替えボタン */}
      <div className="flex justify-center space-x-4 mt-4 mb-6"> {/* ボタンを横並びにして中央に配置し、下にマージンを追加 */}
        <button
          // 現在選択されているボタンに異なるスタイルを適用
          className={`py-2 px-4 rounded-md transition-colors border-black border-2 ${selectedIndex === 0 ? 'bg-amber-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-black border-2'}`}
          onClick={() => setSelectedIndex(0)} // ボタンクリックで最初のキャンパスを選択
        >
          大阪大学 豊中キャンパス
        </button>
        <button
          // 現在選択されているボタンに異なるスタイルを適用
          className={`py-2 px-4 rounded-md transition-colors border-black border-2 ${selectedIndex === 1 ? 'bg-amber-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-black border-2'}`}
          onClick={() => setSelectedIndex(1)} // ボタンクリックで2番目のキャンパスを選択
        >
          大阪大学 箕面キャンパス
        </button>
      </div>
    </div>
  );
};

export default Place;