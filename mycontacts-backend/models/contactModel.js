const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/dislhmbst/image/upload/v1749119635/Screenshot_2025-06-05_160345_xy7pgi.png'
    }
      
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);