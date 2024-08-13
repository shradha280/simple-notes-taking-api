const express = require('express');
const router = express.Router();
const Note = require('../model/note');


router.post('/notes', async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.create({ title, body });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/notes', async (req, res) => {
  try {
    const { title } = req.query;
    const notes = await Note.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${title}%`
        }
      }
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/notes/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const [updated] = await Note.update({ title, body }, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    const note = await Note.findByPk(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
