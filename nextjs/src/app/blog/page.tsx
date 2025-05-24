'use client'
import React, { useState, useEffect } from 'react';
import ScrollToTopLink from "../components/ScrollToTopLink";

interface Article {
  title: string;
  slug: string;
  created_at: string;
  tags: string[];
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // 現在のページ番号
  const [totalCount, setTotalCount] = useState<number>(0); // 全記事数
  const limit = 10; // 1ページあたりの記事数

  const apiUrl = `/api/articles?page=${page}&limit=${limit}`;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response.headers.get('X-Total-Count'))
      setTotalCount(parseInt(response.headers.get('X-Total-Count') || '0', 10)); // ヘッダーから全記事数を取得
      return response.json() as Promise<Article[]>;
    })
    .then(data => {
      setArticles(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('ブログ記事一覧の取得に失敗しました:', err);
      setError(err.message);
      setLoading(false);
    });
    }, [page, limit, apiUrl /* 必要に応じて tag, sort, order を依存配列に追加 */]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0) {
          setPage(newPage);
        }
      };

      const renderPagination = () => {
        const totalPages = Math.ceil(totalCount / limit);
        if (totalPages <= 1) return null;
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
          <div className='flex justify-center mt-5'>
            {page > 1 && (
              <button onClick={() => handlePageChange(page - 1)} className='border rounded cursor-pointer bg-[white] text-[#333] mx-[5px] my-0 px-3 py-2 border-solid border-[#ccc] hover:bg-[#f0f0f0];'>
                « 前へ
              </button>
            )}
            {pages.map(p => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`'${' border rounded cursor-pointer bg-[white] text-[#333] mx-[5px] my-0 px-3 py-2 border-solid border-[#ccc] hover:bg-[#f0f0f0];'}' ${p === page ? 'bg-[#009688] text-[white] border-[#009688];' : ''}`}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button onClick={() => handlePageChange(page + 1)} className='border rounded cursor-pointer bg-[white] text-[#333] mx-[5px] my-0 px-3 py-2 border-solid border-[#ccc] hover:bg-[#f0f0f0];'>
                次へ »
              </button>
            )}
          </div>
        );
      };

  if (loading) {
    return <div>記事を読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <div className='flex flex-col items-center px-5 py-0'>
        <div className='flex flex-col  text-[#424242] items-center bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full max-w-[1000px] pb-[60px] p-5 rounded-lg'>
          <h1 className='text-[2rem] text-[#424242] mt-[30px]'>ブログ</h1>
          <p className='text-[0.9rem] text-[#777] text-center mb-2.5;'>全 {totalCount} 件</p> {/* 全記事数を表示 */}
          <div className='grid md:grid-cols-[repeat(2,minmax(300px,1fr))] gap-5 w-full max-w-[800px] my-[30px] p-0;'>
            {articles?.map(article => (
              <div key={article.slug} className='bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.2s] ease-[ease-in-out] flex flex-col relative min-h-[250px] mb-5 pb-[60px] p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)];'>
                <h2>
                  <ScrollToTopLink href={`/blog/${article.slug}`}>{article.title}</ScrollToTopLink>
                </h2>
                <p className='text-[0.9rem] text-[#777] mb-2.5;'>
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div className='absolute mt-40 bottom-3.5;'>
                    タグ: {article.tags.map(tag => (
                      <span key={tag} className='inline-block bg-[#e0e0e0] text-[#555] rounded text-[0.8rem] mr-[5px] mb-[5px] px-2.5 py-[5px];'>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {articles?.length === 0 && <p>まだ記事はありません。</p>}
          </div>
        </div>
        {renderPagination()}
      </div>
    </div>
  );
}