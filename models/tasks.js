// const mongoose = require('mongoose');
// import { models } from 'mongoose';

// const quoteSchema = new mongoose.Schema({
//     owner: {
//         type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         required: true
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     quote: {
//         type: String,
//         required: true,
//     }
// }, { timestamps: true });

// const Quote=models.Quote || mongoose.model('Quote',quoteSchema);

// export default Quote;

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
