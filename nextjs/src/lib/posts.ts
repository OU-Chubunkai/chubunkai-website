import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPostSlugs(): Promise<{ params: { slug: string } }[]> {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // gray-matter を使用して Markdown ファイルのメタデータとコンテンツを解析
  const matterResult = matter(fileContents);

  // remark を使用して Markdown を HTML に変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // データを ID とコンテンツ HTML を含むように結合
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string }),
  };
}