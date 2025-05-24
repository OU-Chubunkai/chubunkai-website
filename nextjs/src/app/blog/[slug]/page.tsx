'use server'
import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BlogPostData {
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at?: string;
  tags: string[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  console.log(slug)
  try {
    const response = await fetch(`${apiBase}/api/articles/${slug}`, {
      cache: "force-cache", // キャッシュを有効に
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    const data: BlogPostData[] = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    return null;
  }
}

interface BlogPost {
  slug: string;
}

async function fetchAllBlogPostSlugsFromAPI(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${apiBase}/api/articles`, {
      // すべての記事の slug を取得するエンドポイント
      cache: "force-cache", // キャッシュを有効に
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }
    const data: BlogPost[] = await response.json();
    return data;
  } catch (error) {
    console.error('ブログ記事の一覧取得に失敗しました:', error);
    return [];
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await fetchAllBlogPostSlugsFromAPI();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  console.log(post)

  if (!post) {
    notFound();
  }

  const decodedContent = post.content;

  return (
    <div className="container mx-auto py-8">
      <div className={"mx-2 px-2 py-8 text-center flex flex-col items-center bg-white rounded-xl mt-1 mb-10 pt-20"}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDate}>
          公開日: {new Date(post.created_at).toLocaleDateString('ja-JP')}
          {post.updated_at && ` (最終更新日: ${new Date(post.updated_at).toLocaleDateString('ja-JP')})`}
        </p>
        <div className={styles.blogContent}>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: decodedContent }} />
          {post.tags && post.tags.length > 0 && (
            <div className={styles.postTags}>
              <h2>タグ</h2>
              <div className={styles.tagList}>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}