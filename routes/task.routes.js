import express from "express";
import TaskModel from "../model/task.model.js";
import UserModel from "../model/user.model.js";

const taskRoute = express.Router();

taskRoute.post("/create-task/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;

    const newTask = await TaskModel.create({ ...req.body, user: idUser });

    const userUpdated = await UserModel.findByIdAndUpdate(
      idUser,
      {
        $push: {
          tasks: newTask._id,
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

taskRoute.get("/onetask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findById(id).populate("user");

    if (!task) {
      return res.status(400).json({ msg: "Tarefa não encontrado!" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

taskRoute.get("/all-tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({}, { __v: 0, updatedAt: 0 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

taskRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

taskRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ msg: "Task não encontrada!" });
    }

    const userUpdated = await UserModel.findByIdAndUpdate(
      deletedTask.user,
      {
        $pull: {
          tasks: deletedTask._id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export default taskRoute;
