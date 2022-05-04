const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    userType: {
        type: String,
        enum: ['Admin', 'Editor'],
        default: 'Editor'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already registered']
    },
    password: {
        type: String,
        required: [true, 'Alarm value is required']
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', UserSchema);
