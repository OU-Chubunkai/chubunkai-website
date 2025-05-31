'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt } from "react-icons/fa";

interface Event {
  id: string;
  summary?: string | null; // タイトル
  start?: string | null;
  end?: string | null;
  location?: string | null; // 場所
  htmlLink?: string | null; // 元のイベントへのリンク
}

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const formatEventTimeRange = (startString: string | null | undefined, endString: string | null | undefined): string => {
  if (!startString) {
    return '日時不明';
  }

  // 開始日時のDateオブジェクトを生成
  const startDateObj = new Date(startString);

  // 不正な日付文字列の場合
  if (isNaN(startDateObj.getTime())) {
    return '不正な開始日時';
  }

  // 'T'が含まれているかで終日イベントかどうかを簡易判定
  const isAllDay = !startString.includes('T');
  
  const startMonth = startDateObj.getMonth() + 1;
  const startDay = startDateObj.getDate();
  const startDayOfWeek = daysOfWeek[startDateObj.getDay()];

  if (isAllDay) {
    // 終日イベントの場合 (例: '2025-05-08')
    return startDateObj.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric', // numeric または 2-digit
      day: 'numeric'    // numeric または 2-digit
    }) + + `（${startDayOfWeek}） (終日)`;
  }

  // 特定の日時イベントの場合

  // 終了日時のDateオブジェクトを生成
  let endDateObj: Date | null = null;
  if (endString && endString.includes('T')) { // 終了も日時形式の場合のみ処理
       endDateObj = new Date(endString);
       if (isNaN(endDateObj.getTime())) {
           endDateObj = null; // 不正なら使わない
       }
  }

  // 時間部分の整形 (例: 12:40)
  const startHours = startDateObj.getHours().toString().padStart(2, '0');
  const startMinutes = startDateObj.getMinutes().toString().padStart(2, '0');
  const startTime = `${startHours}:${startMinutes}`;

  let timeRangeString = `${startMonth}月${startDay}日（${startDayOfWeek}） ${startTime}`;



  if (endDateObj) {
      // 終了日時が有効な場合
      const endHours = endDateObj.getHours().toString().padStart(2, '0');
      const endMinutes = endDateObj.getMinutes().toString().padStart(2, '0');
      const endTime = `${endHours}:${endMinutes}`;

      // 開始日と終了日が同じかどうかを比較 (年、月、日で比較)
      const isSameDay =
          startDateObj.getFullYear() === endDateObj.getFullYear() &&
          startDateObj.getMonth() === endDateObj.getMonth() &&
          startDateObj.getDate() === endDateObj.getDate();

      if (isSameDay) {
          // 同じ日の場合: 5月15日 12:40～15:00
          timeRangeString += `～${endTime}`;
      } else {
          // 日をまたぐ場合: 2025年5月15日 12:40～2025年5月16日 10:00
           const endYear = endDateObj.getFullYear();
           const endMonth = endDateObj.getMonth() + 1;
           const endDay = endDateObj.getDate();
           const endDayOfWeek = daysOfWeek[endDateObj.getDay()];
           timeRangeString += `～${endYear}年${endMonth}月${endDay}日（${endDayOfWeek}） ${endTime}`;
      }
  }

  return timeRangeString;
};

const Calendar_top = () => { // コンポーネント名をCalendarに修正
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/calendar/events_top');
        if (!response.ok) {
          // APIルートからのエラーレスポンス（status: 401, 500など）を処理
          const errorData = await response.json();
          throw new Error(`Failed to fetch events: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        console.log('API Response Data:', data); // デバッグ用

        // APIルートから返される形式が { events: [...] } であることを想定
        if (data && Array.isArray(data.events)) {
             setEvents(data.events);
             console.log('Fetched Events:', data.events); // デバッグ用
        } else {
            // レスポンス形式が想定と異なる場合
            throw new Error('Invalid data format received from API.');
        }

      } catch (e: unknown) {
        console.error('Failed to fetch calendar events:', e);
        if(e instanceof Error)
          setError(e.message || 'Unknown error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarEvents();
  }, []);

  const groupedEventsByMonth = useMemo(() => {
      const grouped: { [key: string]: Event[] } = {};

      events.forEach(event => {
          if (event.start) {
              const startDateObj = new Date(event.start);
              // 不正な日付や終日イベントの場合はスキップまたは特別なグループに入れることも検討
              if (!isNaN(startDateObj.getTime())) {
                   // 年と月を取得 (月は0-indexedなので+1)
                   const year = startDateObj.getFullYear();
                   const month = startDateObj.getMonth() + 1;
                   // グループ化のためのキー (例: "2025-05")
                   const key = `${year}-${month.toString().padStart(2, '0')}`;

                   // キーが存在しない場合は新しい配列を作成
                   if (!grouped[key]) {
                       grouped[key] = [];
                   }
                   // その月にイベントを追加
                   grouped[key].push(event);
               }
          }
      });

      // 月の昇順でグループのキーをソート
      const sortedKeys = Object.keys(grouped).sort();

      // ソートされたキーの順にグループを並べ替える
      const sortedGrouped: { [key: string]: Event[] } = {};
      sortedKeys.forEach(key => {
          // 各月のイベントも開始時刻順にソートするとより見やすい
          sortedGrouped[key] = grouped[key].sort((a, b) => {
              if (!a.start || !b.start) return 0; // 日付がない場合はソートしない
              return new Date(a.start).getTime() - new Date(b.start).getTime();
          });
      });


      return sortedGrouped;
  }, [events]); // events ステートが変更されたときに再計算

  // グループ化された月のキーのリストを取得
  const monthKeys = Object.keys(groupedEventsByMonth);


  
  return (
    <div className='container w-full max-w-[800px] md:max-w-[1200px] mx-auto bg-amber-950 text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] my-0 px-5 py-[20px] rounded-lg overflow-x-auto'>
      <div className='text-[2rem] place-items-center mt-4'>
        <FaCalendarAlt />
        <h2 className='text-[2rem] font-bold text-[#f9f9f9] text-center mt-2 mb-4 border-b-4'>活動予定</h2> {/* mbを増やしました */}
      </div>

      {loading && <p>読み込み中...</p>}
      {error && <p className='text-red-500'>エラー: {error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>今後の予定はありません。</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div>
            {/* ★ 月ごとのセクションを表示 ★ */}
            {monthKeys.length === 0 && <p>イベントが見つかりませんでした。</p>} {/* グループ化された結果が空の場合 */}

            {monthKeys.map(monthKey => {
                const monthEvents = groupedEventsByMonth[monthKey];
                return (
                  <div key={monthKey} className="grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {monthEvents.map(event => (
                      <div key={event.id} className="bg-[white] rounded-md shadow-md overflow-hidden w-full h-max mb-3">
                        {/* 画像埋め込み場所 */}
                        <div className="aspect-w-16 aspect-h-9 p-12 bg-[#f8e8e8] w-full h-max items-center text-center">
                          {/* <img src={event.imageUrl} alt={event.summary} className="object-cover w-full h-full" /> */}
                          {/*<div className="flex items-center justify-center h-full text-gray-400 text-sm">
                              （画像はありません）
                            </div>*/}
                          <h2 className="text-gray-800 font-bold mb-4">{event.location || '-'}</h2>
                          <h3 className="text-gray-800 text-sm">{formatEventTimeRange(event.start, event.end)}</h3>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {event.summary || '(タイトルなし)'}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2">
                            <span className="font-bold">時間:</span> {formatEventTimeRange(event.start, event.end)}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            <span className="font-bold">場所:</span> {event.location || '-'}
                          </p>
                          {/* 必要に応じて他のイベント情報も追加 */}
                        </div>
                      </div>
                    ))}
                  </div>
                );
            })}
        </div>
      )}

       {/* 認証フローへの誘導など、必要に応じて追加情報を表示 */}
       {!loading && !error && events.length === 0 && (
           <p className='mt-4'>
               カレンダーイベントが表示されない場合は、
               <a href="/api/auth/google" className="text-blue-600 hover:underline">Googleアカウントとの連携</a>
               が必要かもしれません。
           </p>
       )}
    </div>
  )
}

export default Calendar_top;