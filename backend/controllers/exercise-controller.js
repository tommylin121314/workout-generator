import Exercise from "../models/exercise-model.js";
import mongoose from "mongoose"


export const getAllExercises = async(req, res, next) => {

    let exercises;

    try {
        exercises = await Exercise.find();
    }
    catch (err) {
        return next(err);
    }

    if (!exercises) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when fetching exercises."
        })
    }

    return res.status(200).json({
        exercises: exercises,
        message: "Exercises fetched successfully."
    })
}

export const createExercise = async(req, res, next) => {

    let { name, description, difficulty, target, isPublic } = req.body;

    if ( !name || !description || !difficulty || !target || isPublic === null ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    name = name.trim()
    description = description.trim()
    
    if ( !name || !description || !difficulty || !target || isPublic === null ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    let exercise;

    try {
        exercise = new Exercise({
            name: name,
            description: description,
            difficulty: difficulty,
            target: target,
            isPublic: isPublic,
        })
        if (!isPublic) {
            exercise.ownerId = req.body.ownerId
        }
        exercise = await exercise.save()
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(500).json({
            err_code: 1,
            message: "Error occured when creating exercise."
        })
    }

    return res.status(200).json({
        exercise: exercise,
        message: "Exercise was successfully created."
    })
    
}

export const deleteExercise = async(req, res, next) => {

    const exerciseId = req.body.exerciseId;

    if (!exerciseId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    let deletedExercise;

    try {
        deletedExercise = await Exercise.findById(exerciseId);
    }
    catch (err) {
        return res.status(500).json({
            err_code: 1,
            message: "Error occured when deleting exercise."
        })
    }

    if (!deletedExercise) {
        return res.status(400).json({
            err_code: 2,
            message: "Exercise not found."
        })
    }

    if (deletedExercise.isPublic) {
        return res.status(500).json({
            err_code: 3,
            message: "Cannot delete public exercise."
        })
    }

    const ownerId = req.body.ownerId;

    if (!ownerId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    if ((mongoose.Types.ObjectId(ownerId)).equals(deletedExercise.ownerId)) {
        try {
            deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
        }
        catch (err) {
            return res.status(500).json({
                err_code: 1,
                message: "Error occured when deleting exercise."
            })
        }
        return res.status(200).json({
            exercise: deletedExercise,
            message: "Exercise was successfully deleted."
        })
    }
    else {
        return res.status(400).json({
            err_code: 4,
            message: "Do not have ownership over this exercise."
        })
    }

}