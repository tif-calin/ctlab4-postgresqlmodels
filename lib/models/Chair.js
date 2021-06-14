import pool from '../utils/pool';

export default class Chair {
  id;
  legs;
  hasWheels;

  constructor(row) { 
    this.id = row.id;
    this.legs = row.legs;
    this.hasWheels = row.has_wheels
  }

  static insert({ legs, hasWheels: has_wheels }) {
    const { rows } = await pool.query(`
      INSERT INTO chairs (legs, has_wheels) 
      VALUES ($1, $2) 
      RETURNING *;
    `, [legs, has_wheels]      
    );

    return new Chair(rows[0]);
  }

  static findById(id) {
    const { rows } = await pool.query(`
      SELECT * 
      FROM chairs
      WHERE id = $1;
    `, [id]
    );

    if (!rows[0]) return null;

    return new Chair(rows[0]);
  }

  static findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM chairs
    `);

    return new Chair(rows[0]);
  }

  static async update({ legs, hasWheels: has_wheels }) {
    const { rows } = await pool.query(`
      UPDATE chairs
      SET legs = $2, has_wheels = $3
      WHERE id = $1
      RETURNING *;
    `, [legs, has_wheels]);
    
    return new Chair(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM chairs
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Chair(rows[0]);
  }

}
