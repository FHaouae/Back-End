const Film = require('../models/Film');

const getAllFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }
        res.json(film);
    } catch (error) {
        console.error('Error fetching film by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createFilm = async (req, res) => {
    try {
        const { titre, description, acteurs, realisateur } = req.body;
        const nouveauFilm = new Film({ titre, description, acteurs, realisateur });
        await nouveauFilm.save();
        res.status(201).json({ message: 'Film ajouté avec succès', film: nouveauFilm });
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
};
const updateFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFilm = await Film.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedFilm) {
            return res.status(404).json({ error: 'Film not found' });
        }

        res.json(updatedFilm);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFilm = await Film.findByIdAndDelete(id);

        if (!deletedFilm) {
            return res.status(404).json({ error: 'Film not found' });
        }

        res.json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { getAllFilms, createFilm, updateFilm, deleteFilm, getFilmById };