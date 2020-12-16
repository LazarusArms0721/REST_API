import express from './express';
import { v4 as uuidv4 } from 'uuid';
// import { createSongs } from '../controllers/songs.js';

const router = express.Router();

import Song from '../models/Song.js';


router.get('/', async (req, res) => {
    const pageSize = 2;
    const currentPage = req.query.page > 0 ? req.query.page - 1 : 0;

    Song.count().then(songCount => {
        if (currentPage * pageSize > songCount) {
            return res.status(400).json([])
        }
        Song.find()
        .limit(pageSize)
        .skip(currentPage * pageSize)
        .sort({
            date: -1
        })
        .then(songs => {
            return res.status(200).json({
                songs,
                _links: [{

                }],
                pagination: [{
                    page: req.query.page || 1,
                    total: songCount,
                    pageSize: pageSize
                }]
            });
        });
    });


});

router.post('/', async (req,res) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
        release: req.body.release
    });

    try {
    const savedSong = await song.save();
    res.json(savedSong);
    res.sendStatus(200);
    } catch(err) {
        res.json({message: err});
    }

});

router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        res.json(song);
        res.sendStatus(200);
    } catch(err) {
        res.json({message: err});
    }
});

router.delete('/:id', async (req,res) =>{
    try {
        const removedSong = await Song.remove({_id: req.params.id });
        res.json(removedSong);
        res.sendStatus(200);
    } catch(err) {
        res.json({message: err});

    }

});

router.patch('/:id', async (req,res) => {
    try {
        const updateSong = await Song.updateOne({_id: req.params.id },
            { $set:
                {
                    title: req.body.title,
                    album: req.body.album,
                    artist: req.body.artist,
                    release: req.body.release,
                    genre: req.body.genre,
                    image: req.body.image,
                }
            }
        );
        res.json(updateSong);


    } catch {
        res.json({message: err});
    }

});



export default router;