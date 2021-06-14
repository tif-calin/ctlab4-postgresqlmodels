import pool from '../utils/pool';

export default class Cat {
  id;
  name;
  lives;
  favoriteFood;

  constructor(row) { 
    this.id = row.id;
    this.name = row.name;
    this.lives = row.lives;
    this.favoriteFood = row.favorite_food
  }

  static insert({ name, lives, favoriteFood: favorite_food }) {
    const { rows } = await pool.query(`
      INSERT INTO cats (name, lives, favorite_food) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [name, lives, favorite_food]      
    );

    return new Cat(rows[0]);
  }

  static findById(id) {
    const { rows } = await pool.query(`
      SELECT * 
      FROM cats
      WHERE id = $1;
    `, [id]
    );

    if (!rows[0]) return null;

    return new Cat(rows[0]);
  }

  static findAll() {
    const { rows } = await pool.query(`
      SELECT * FROM cats
    `);

    return new Cat(rows[0]);
  }

  static async update({ name, lives, favoriteFood: favorite_food }) {
    const { rows } = await pool.query(`
      UPDATE cats
      SET name = $2, lives = $3, favorite_food = $4
      WHERE id = $1
      RETURNING *;
    `, [name, lives, favorite_food]);
    
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM cats
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return new Cat(rows[0]);
  }

}
