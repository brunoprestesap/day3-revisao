import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
    {
        title: {type: String},
        details: { type: String, required: true },
        complete: { type: Boolean, default: false },
        dateFin: { type: Date },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        collab: [ { type: Schema.Types.ObjectId, ref: "User"} ],
    },
    { timestamps: true }
)

const taskModel = model("Task", taskSchema)

export default taskModel