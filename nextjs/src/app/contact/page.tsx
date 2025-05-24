'use client'
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Blog() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('送信中...');

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('お問い合わせを送信しました。');
        setFormData({ name: '', email: '', message: '' }); // フォームをリセット
      } else {
        setSubmissionStatus('お問い合わせの送信に失敗しました。');
      }
    } catch (error) {
      console.error('お問い合わせフォーム送信エラー:', error);
      setSubmissionStatus('お問い合わせの送信中にエラーが発生しました。');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className='flex flex-col items-center px-5 py-0'>
        <div className='flex flex-col  text-[#424242] items-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full max-w-[1000px] pb-[60px] p-5 rounded-lg'>
          <h1 className='text-[2rem] text-[#424242] mt-[30px]'>お問い合わせ</h1>
          <p className="items-center text-center mt-[30px]"><strong>※必要事項をご記入の上、送信ボタンを押してください。</strong></p>
          {submissionStatus && <p className={`${'text-base text-center mb-5 p-[15px] rounded-md;'} ${submissionStatus.includes('成功') ? 'bg-[#d4edda] text-[#155724] border border-solid border-[#c3e6cb];' : 'border border-solid border-[#f5c6cb];'}`}>{submissionStatus}</p>}
          <form onSubmit={handleSubmit} className='flex flex-col max-w-[800px] w-full mt-5 mb-10;'>
            <div className='flex flex-col max-w-full relative mb-[25px];'>
              <label htmlFor="name">氏名</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="例：山田太郎"
                className='mb-[25px] border-[#ddd] w-[calc(60%_-_5px)] border rounded text-[0.9rem] box-border p-2 border-solid;'
              />
            </div>
            <div className='flex flex-col max-w-full relative mb-[25px];'>
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="例：taro.yamada@example.com"
                className='mb-[25px] border-[#ddd] w-[calc(60%_-_5px)] border rounded text-[0.9rem] box-border p-2 border-solid;'
              />
            </div>
            <div className='flex flex-col max-w-full relative mb-[25px];'>
              <label htmlFor="message">お問い合わせ内容</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={10}
                required
                placeholder="お問い合わせ内容をご記入ください"
                className='mb-[25px] w-full border text-base box-border transition-[border-color] duration-[0.3s] ease-[ease] p-3 rounded-md border-solid border-[#ddd] focus:shadow-[0_0_5px_rgba(0,150,136,0.3)] focus:border-[#009688] resize-y h-[150px]'
              ></textarea>
            </div>
            <div>
              <button type="submit" className='bg-[#009688] text-[white] rounded text-[0.9rem] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] w-auto px-[15px] py-2.5 border-[none] hover:bg-[#00796a] hover:-translate-y-0.5;'>送信</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }