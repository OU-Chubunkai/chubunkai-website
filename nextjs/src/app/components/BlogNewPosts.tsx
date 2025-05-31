'use client'

import React, { useState, useEffect } from 'react';
import ScrollToTopLink from './ScrollToTopLink';
import { FaRegNewspaper } from "react-icons/fa";

interface Article {
  title: string;
  slug: string;
  created_at: string;
  tags: string[];
}

const BlogNewPosts = (props: { page: number, limit: number, headline: string }) => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const apiUrl = `/api/articles?page=` + props.page + '&limit=' + props.limit; // 最新6件の記事を取得するAPIエンドポイント

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLatestArticles(data);
      })
      .catch(error => {
        console.error('最新記事の取得に失敗しました:', error);
        // エラーハンドリング (例: エラーメッセージの表示)
      });
  }, [apiUrl]);

  return (
    <div className='bg-[#be8e8e] w-full h-full max-w-[1200px] max-h-[580px] text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] mx-auto my-0 py-[20px] rounded-lg'>

      <div className='text-[3rem] text-amber-950 place-items-center mt-4'>
        <FaRegNewspaper />
        <h2 className='text-[2rem]  font-bold text-amber-950 mt-1 mb-1 border-b-4'>{props.headline}</h2>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] p-5'>
        {latestArticles.map(article => (
          <div key={article.slug} className='bg-[#faf2f2] text-[#424242] shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-left p-5 rounded-lg'>
            <h3 className='text-[1.2rem] text-[#424242] overflow-hidden text-ellipsis whitespace-nowrap mb-2.5'>{article.title}</h3>
            <p className='text-[0.9rem] text-[#777] mb-2.5'>
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <ScrollToTopLink href={`/blog/${article.slug}`}>続きを読む</ScrollToTopLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogNewPosts;