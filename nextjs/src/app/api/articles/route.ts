import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
  const { page = 1, limit = 10, tag, sort = 'created_at', order = 'DESC' } = Object.fromEntries(request.nextUrl.searchParams);
  const currentPage = parseInt(page as string);
  const itemsPerPage = parseInt(limit as string);
  const offset = (currentPage - 1) * itemsPerPage;
  const values = [];

  let query = `
    SELECT
      a.id,
      a.title,
      a.slug,
      a.created_at,
      ARRAY_AGG(t.name) AS tags
    FROM
      articles a
    LEFT JOIN
      article_tags at ON a.id = at.article_id
    LEFT JOIN
      tags t ON at.tag_id = t.id
    WHERE
      a.is_published = TRUE
  `;

  let countQuery = `
    SELECT
      COUNT(a.id)
    FROM
      articles a
    WHERE
      a.is_published = TRUE
  `;

  if (tag) {
    query += ` AND t.name = $${values.length + 1}`;
    countQuery += ` AND EXISTS (
      SELECT 1 FROM article_tags at_count
      JOIN tags t_count ON at_count.tag_id = t_count.id
      WHERE at_count.article_id = a.id AND t_count.name = $${values.length + 1}
    )`;
    values.push(tag);
  }

  query += `
    GROUP BY a.id, a.title, a.slug, a.created_at
    ORDER BY ${sort} ${order}
    LIMIT $${values.length + 1} OFFSET $${values.length + 2}
  `;
  values.push(itemsPerPage, offset);

  try {
    const articlesResult = await pool.query(query, values);
    const countResult = await pool.query(countQuery, tag ? [`%${tag}%`] : []);
    const totalCount = countResult.rows[0].count;

    const response = NextResponse.json(articlesResult.rows || 'hello');
    response.headers.set('X-Total-Count', totalCount.toString());
    response.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');

    return response;
  } catch (error) {
    console.error('Error fetching articles for pagination:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}