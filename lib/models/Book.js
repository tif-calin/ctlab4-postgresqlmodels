import pool from '../utils/pool';

export default class Book {
  id;
  title;
  pageCount;
  author;

  constructor(row) { 
    this.id = row.id;
    this.title = row.title;
    this.pageCount = row.page_count;
    this.author = row.author
  }

  static insert({ title, pageCount: page_count, author }) {
    const { rows } = await pool.query(`
      INSERT INTO books (title, page_count, author) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [title, page_count, author]      
    );

    return new Book(rows[0]);
  }

  static findById(id) {
    const { rows } = await pool.query(`
      SELECT * 
      FROM books
      WHERE id = $1;
    `, [id]
    );

    if (!rows[0]) return null;

    return new Book(rows[0]);
  }

  static findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM books
    `);

    return new Book(rows[0]);
  }

  static async update({ title, pageCount: page_count, author }) {
    const { rows } = await pool.query(`
      UPDATE books
      SET title = $2, page_count = $3, author = $4
      WHERE id = $1
      RETURNING *;
    `, [title, page_count, author]);
    
    return new Book(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM books
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Book(rows[0]);
  }

}
