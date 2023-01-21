import express from 'express'
import TaskModel from '../model/task.model.js'
import UserModel from '../model/user.model.js'

const userRoute = express.Router()

//CREATE - CRUD
userRoute.post('/create-user', async (req, res) => {
    try {

        const form = req.body
        const newUser = await UserModel.create(form)
        return res.status(201).json(newUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Algo deu errado na criação do usuário" })
    }
})

userRoute.get('/all-users', async (req, res) => {
    try {

        const users = await UserModel.find({}, { __v: 0, updatedAt: 0 }).sort({ age: 1 })
        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

userRoute.get("/oneuser/:id", async (req, res) => {
    try {

        const { id } = req.params

        const user = await UserModel.findById(id).populate("tasks")

        if (!user) {
            return res.status(400).json({ msg: "Usuário não encontrado!" })
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

userRoute.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

userRoute.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params

        const deletedUser = await UserModel.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        await TaskModel.deleteMany({ user: id })

        return res.status(200).json(deletedUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

export default userRoute