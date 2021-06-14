import pool from '../utils/pool';

export default class Beer {
  id;
  color;
  flavor;

  constructor(row) { 
    this.id = row.id;
    this.color = row.color;
    this.flavor = row.flavor;
  }

  static insert({ color, flavor }) {
    const { rows } = await pool.query(`
      INSERT INTO dogs (name, age, weight) 
      VALUES ($1, $2, $3) 
      RETURNING *'
    `, [color, flavor]      
    );

    return new Beer(rows[0]);
  }

  static findById(id) {
    const { rows } = await pool.query(`
      SELECT * 
      FROM beers
      WHERE id = $1;
    `, [id]
    );

    if (!rows[0]) return null;

    return new Beer(rows[0]);
  }

  static findAll() {
    const { rows } = await pool.query(`SELECT * FROM beers`, [id]);

    return new Beer(rows[0]);
  }

  static async update({ id, color, flavor }) {
    const { rows } = await pool.query(`
      UPDATE beers
      SET color = $2, flavor = $3
      WHERE id = $1
      RETURNING *;
    `, [id, color, flavor]);
    
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM beers
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Beer(rows[0]);
  }

}
