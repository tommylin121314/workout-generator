import Exercise from "../models/exercise-model.js";

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