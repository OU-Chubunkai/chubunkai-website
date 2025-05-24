// 例: app/api/calendar/events/route.ts (カレンダーイベント取得)
import { google, Auth } from 'googleapis';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs'; // Node.jsのファイルシステムモジュールをインポート
import path from 'path'; // パス操作モジュールをインポート

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// トークンが保存されているファイルのパス
const TOKEN_PATH = path.join(process.cwd(), 'tokens.json');

// ★★★ 保存された認証トークンを読み込み、oauth2Clientに設定する関数 ★★★
async function loadAndSetTokens(): Promise<Auth.Credentials | null> {
    try {
        const content = await fs.readFile(TOKEN_PATH, 'utf-8');
        const tokens = JSON.parse(content);

        if (tokens) {
            oauth2Client.setCredentials(tokens);
            console.log('Tokens loaded and set from', TOKEN_PATH);

            // トークンの自動更新を設定
            // 新しいアクセストークンやリフレッシュトークンが発行された際にファイルも更新する
            oauth2Client.on('tokens', async (newTokens) => {
                console.log('Tokens refreshed:', newTokens);
                try {
                    // 新しいリフレッシュトークンがあれば、既存のtokensオブジェクトをマージして保存
                    const updatedTokens = { ...tokens, ...newTokens };
                    await fs.writeFile(TOKEN_PATH, JSON.stringify(updatedTokens, null, 2));
                    console.log('Refreshed tokens saved to', TOKEN_PATH);
                } catch (saveError) {
                    console.error('Failed to save refreshed tokens to file:', saveError);
                }
            });

            return tokens; // 読み込んだトークンを返す
        }
    } catch (err: unknown) {
      console.warn('Tokens file not found at', TOKEN_PATH, '. Please run the authentication flow first.' + err);
    }
    return null; // トークンが読み込めなかった場合
}


export async function GET() {
  // ★★★ API呼び出しを行う前にトークンを読み込み設定 ★★★
  const tokens = await loadAndSetTokens();

  // トークンが設定されているか確認
  if (!tokens || !tokens.access_token) {
     console.error('OAuth2 tokens are not available for API call.');
     return NextResponse.json(
       { error: 'Authentication required. Please complete the Google authentication flow first by accessing /api/auth/google.' },
       { status: 401 } // Unauthorized
     );
  }


  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client as Auth.OAuth2Client });

    const response = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID, // 環境変数から読み込む
      timeMin: new Date().toISOString(), // 現在時刻以降のイベントを取得
      maxResults: 3, // 取得する最大イベント数
      singleEvents: true, // 繰り返しイベントを展開
      orderBy: 'startTime', // 開始時刻でソート
    });

    const events = response.data.items;

    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return NextResponse.json({ events: [] }); // イベントがない場合も空の配列を返す
    }

    // 取得したイベント情報を整形して返す（例: 必要な情報のみ抽出）
    const formattedEvents = events.map(event => ({
        id: event.id,
        summary: event.summary,
        start: event.start?.dateTime || event.start?.date, // 開始日時または開始日
        end: event.end?.dateTime || event.end?.date, // 終了日時または終了日
        location: event.location,
        htmlLink: event.htmlLink,
    }));


    return NextResponse.json({ events: formattedEvents }); // 整形したイベントを返す

  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error fetching calendar events:', error.message || error);
     if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', error);
    }

    // Google APIからのエラーで、認証関連の場合は401を返すなどの詳細なハンドリングも可能
    // 例: if (error.code === 401) { ... return NextResponse.json({error: 'Invalid or expired tokens'}, { status: 401 }); }

    return NextResponse.json(
      { error: 'Failed to fetch calendar events', details: error || 'Unknown error' },
      { status: 500 }
    );
  }
}