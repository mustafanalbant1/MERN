const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const cors = require('cors');

// Not Ekleme (Create)
router.post('/notes', async (req, res) => {
    try {
        const { title, content, color } = req.body;
        const newNote = new Note({
            title,
            content,
            color: color || '#FFFFFF',
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);  // Fixed variable name
    } catch (error) {
        res.status(500).json({ message: error.message });  // Fixed json spelling
    }
});

// Notları Listeleme (Read)
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Fixed json spelling
    }
});

// Not Güncelleme (Update)
router.put('/notes/:id', async (req, res) => {
    try {
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateNote);  // Returning updated note
    } catch (error) {
        res.status(500).json({ message: error.message });  // Fixed json spelling
    }
});

// Not Silme (Delete)
router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Not başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Fixed json spelling
    }
});

module.exports = router;
