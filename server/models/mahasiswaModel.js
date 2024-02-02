const mongoose = require('mongoose')

const mahasiswaSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must be filled!"]
        },
        age: {
            type: Number,
            required: [true, "Age must be filled!"]
        },
        email: {
            type: String,
            required: [true, "Email must be filled!"]
        },
        phone: {
            type: String,
            required: [true, "Phone must be filled!"]
        },
        batch: {
            type: String,
            required: [true, "batch must be filled"]
        },
        image: {
            type: String,
            required: false
        },
    }
)

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa;