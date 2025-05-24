import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: process.env.SMTP_SECURE === 'true', // TLS/STARTTLS を使用するかどうか (true/false)
  auth: {
    user: process.env.SMTP_USER, // 送信元メールアドレス
    pass: process.env.SMTP_PASSWORD, // 送信元メールアドレスのパスワード
  },
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, message } = await req.json();

    console.log('Received data:', { name, email, message });

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // 送信するメールのオプション
    const mailOptions = {
      from: email, // 送信者のメールアドレス
      to: process.env.CONTACT_EMAIL, // 受信者のメールアドレス (環境変数から取得)
      subject: `New Inquiry from ${name}`, // 日本語なら'お問い合わせ: ${name} 様', 英語なら 'New Inquiry from ${name}'
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message:</p>
        <pre>${message}</pre>
      `,
    };

    // メールを送信
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // お問い合わせ受付完了のレスポンス
    return NextResponse.json(
      { message: 'Your inquiry has been received. We will get back to you as soon as possible.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form and sending email:', error);
    return NextResponse.json({ error: 'Failed to process your inquiry' }, { status: 500 });
  }
}