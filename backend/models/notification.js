const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    },
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job' 
    },
    date: {
        type: Date,
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },
    sharedWith: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Association' 
    }],
    viewedBy: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Association' 
    }]
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema);

module.exports.Notification = Notification;
