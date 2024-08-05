const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    category: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: String,
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const userData = mongoose.model('user', userSchema);
module.exports = userData;
