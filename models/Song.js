import mongoose from 'mongoose';

const SongSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model('Songs', SongSchema);