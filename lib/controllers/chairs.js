import { Router } from 'express';
import Chair from '../models/Chair';

export default Router()
  .post('/api/v1/chairs', async (req, res) => {
    try {
      const chair = await chair.insert(req.body);
      res.send(chair);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/chairs/:id', async (req, res) => {
    try {
      const chair = await Chair.findById(req.params.id);
      res.send(chair);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/chairs', async (req, res) => {
    try {
      const chairs = await Chair.findAll();
      res.send(chairs);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/chairs', async (req, res) => {
    try {
      const chair = await Chair.update(req.body);
      res.send(chair);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/chairs/:id', async (req, res) => {
    try {
      const chair = await Chair.delete(req.params.id);
      res.send(chair);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
;
