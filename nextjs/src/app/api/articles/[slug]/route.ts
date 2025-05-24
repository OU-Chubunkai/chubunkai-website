import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
 ): Promise<NextResponse> {
  const { slug } = await params
  const query = `
    SELECT
      a.title,
      a.slug,
      a.content,
      a.created_at,
      a.updated_at,
      ARRAY_AGG(t.name) AS tags
    FROM
      articles a
    LEFT JOIN
      article_tags at ON a.id = at.article_id
    LEFT JOIN
      tags t ON at.tag_id = t.id
    WHERE
      a.slug = $1 AND a.is_published = TRUE
    GROUP BY a.id, a.title, a.slug, a.content, a.created_at, a.updated_at
  `;

  try {
    const result = await pool.query(query, [slug]);
    if (result.rows.length > 0) {
      const response = NextResponse.json(result.rows || 'hello');
      return response;
    } else {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
}