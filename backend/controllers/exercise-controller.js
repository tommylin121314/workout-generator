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

export const getExerciseById = async(req, res, next) => {

    const exerciseId = req.body.exerciseId;
    let exercise;

    if (!exerciseId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        exercise = await Exercise.findById(exerciseId);
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(400).json({
            err_code: 1,
            message: "Exercise not found."
        })
    }

    return res.status(200).json({
        exercise: exercise,
        message: "Exercise was successfully fetched."
    })
}

export const createExercise = async(req, res, next) => {

    let { name, description, difficulty, target, isCountable, isPublic } = req.body;

    if ( !name || !description || !difficulty || !target || !isCountable || isPublic === null ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    name = name.trim()
    description = description.trim()
    
    if ( !name || !description || !difficulty || !target || !isCountable || isPublic === null ) {
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
            isCountable: isCountable,
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
            message: "Error occured when finding exercise."
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

export const updateExercise = async(req, res, next) => {
     
    let {id, ownerId, name, description, isCountable, difficulty, target} = req.body;
    let exercise;

    if ( !id || !name || !description || !isCountable || !difficulty || !target ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    name = name.trim()
    description = description.trim()
    
    if ( !id || !name || !description || !isCountable || !difficulty || !target ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        exercise = await Exercise.findById(id);
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(400).json({
            err_code: 1,
            message: "Exercise not found."
        })
    }

    if (!ownerId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    if (!mongoose.Types.ObjectId(ownerId).equals(exercise.ownerId)) {
        return res.status(400).json({
            err_code: 2,
            message: "Do not have access to this exercise."
        })
    }


    try {
        exercise = await Exercise.findByIdAndUpdate(id, {
            name: name,
            description: description,
            target: target,
            difficulty: difficulty,
            isCountable: isCountable
        }, {
            new: true
        })
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(500).json({
            err_code: 3,
            message: "Error occured when updating exercise."
        })
    }

    return res.status(200).json({
        exercise: exercise,
        message: "Exercise was successfully updated."
    })

}