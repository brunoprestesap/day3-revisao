import { Schema, model } from "mongoose"

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 20,
        lowercase: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    role: {
        type: String,
        enum: ['professor', 'aluno', 'TA'],
        default: 'aluno'
    },
    active: {
        type: Boolean,
        default: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId, ref: "Task"
        }
    ],
},
{
    timestamps: true,
}
)

const UserModel = model("User", userSchema)

export default UserModel