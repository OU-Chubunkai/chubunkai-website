// 例: app/api/auth/google/callback/route.ts (認証コールバック)
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs'; // Node.jsのファイルシステムモジュールをインポート
import path from 'path'; // パス操作モジュールをインポート

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
const TOKEN_PATH = path.join(process.cwd(), 'tokens.json');

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code'); // URLから認可コードを取得

  // 認可コードがない場合はエラー
  if (!code) {
    console.error('Authorization code not found in callback URL');
    return NextResponse.json({ error: 'Authorization code not found.' }, { status: 400 });
  }

  try {
    // 認可コードを使用してトークンを取得
    const { tokens } = await oauth2Client.getToken(code);

    console.log('Successfully obtained tokens:', tokens);

    // ★★★ 取得したトークンをファイルに保存 ★★★
    try {
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log('Tokens saved to', TOKEN_PATH);
    } catch (saveError) {
        console.error('Failed to save tokens to file:', saveError);
        // トークン取得は成功したのでエラーにはしないがログを出す
    }
    const url = process.env.NEXT_PUBLIC_API_BASE_URL || "/";
    return NextResponse.redirect(new URL(url, req.url));

  } catch (error: unknown) {
    if (error instanceof Error)
      console.error('Error exchanging authorization code for tokens:', error.message || error);
     if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', error);
    }
    return NextResponse.json(
      { error: 'Failed to obtain tokens', details: error || 'Unknown error' },
      { status: 500 }
    );
  }
}