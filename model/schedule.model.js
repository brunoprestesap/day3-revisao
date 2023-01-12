import { Schema, model } from 'mongoose'

const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 80,
        lowercase: true,
    },
    whatsapp: {
        type: String,
        match: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    date: {
        type: Date
    },
    status: {
        type: Boolean,
        dafault: false
    }
},
{
    timestamps: true
})

const ScheduleModel = model("Schedule", scheduleSchema)

export default ScheduleModel