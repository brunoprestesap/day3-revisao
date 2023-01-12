import express from 'express'
import ScheduleModel from '../model/schedule.model.js'

const scheduleRoute = express.Router()

scheduleRoute.post('/create', async (req, res) => {
    try {

        const form = req.body
        const newSchedule = await ScheduleModel.create(form)
        return res.status(201).json(newSchedule)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Algo deu errado na criação do agendamento" })
    }
})

scheduleRoute.get('/all', async (req, res) => {
    try {

        const schedules = await ScheduleModel.find({})
        return res.status(200).json(schedules)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

scheduleRoute.get('one-schedule/:id', async (req, res) => {
    try {

        const { id } = req.params

        const schedule = await ScheduleModel.findById(id)

        if (!schedule) {
            return res.status(404).json({ msg: "Agendamento não encontrado!" })
        }

        return res.status(200).json(schedule)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

scheduleRoute.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params

        const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json(updatedSchedule)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

scheduleRoute.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params

        const deletedSchedule = await ScheduleModel.findByIdAndDelete(id)

        if (!deletedSchedule) {
            return res.status(404).json({ msg: "Agendamento não encontrado!" })
        }

        return res.status(200).json(deletedSchedule)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.errors)
    }
})

export default scheduleRoute