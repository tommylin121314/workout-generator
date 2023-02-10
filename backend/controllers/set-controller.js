import Set from "../models/set-model.js";
import Exercise from "../models/exercise-model.js";
import mongoose from "mongoose"

export const getAllSets = async(req, res, next) => {

    let sets;

    try {
        sets = await Set.find();
    }
    catch (err) {
        return next(err);
    }

    if (!sets) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when fetching sets."
        })
    }

    return res.status(200).json({
        sets: sets,
        message: "Sets fetched successfully."
    })

}

export const getSetById = async(req, res, next) => {

    const setId = req.body.setId;
    let set;

    if (!setId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        set = await Set.findById(setId);
    }
    catch (err) {
        return next(err)
    }

    if (!set) {
        return res.status(400).json({
            err_code: 1,
            message: "Set not found."
        })
    }

    return res.status(200).json({
        set: set,
        message: "Set was successfully fetched."
    })

}

export const createSet = async(req, res, next) => {

    let { exerciseId, duration, count } = req.body;
    let exercise;

    if ( !exerciseId ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        exercise = await Exercise.findById(exerciseId)
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(400).json({
            err_code: 2,
            message: "Exercise not found."
        })
    }

    if (exercise.isCountable) {
        if ( !count ) {
            return res.status(400).json({
                err_code: 1,
                message: "Please enter all required fields."
            })
        }
        if (count <= 0) {
            return res.status(400).json({
                err_code: 3,
                message: "Set count can not be less than 0."
            })
        }
        duration = null
    }
    else {
        if ( !duration ) {
            return res.status(400).json({
                err_code: 0,
                message: "Please enter all required fields."
            })
        }
        if (duration <= 0) {
            return res.status(400).json({
                err_code: 3,
                message: "Set duration can not be less than 0."
            })
        }
        count = null
    }
    
    let set;

    try {
        set = new Set({
            exerciseId: exerciseId,
            duration: duration,
            count: count,
        })
        set = await set.save()
    }
    catch (err) {
        return next(err)
    }

    if (!set) {
        return res.status(500).json({
            err_code: 2,
            message: "Error occured when creating set."
        })
    }

    return res.status(200).json({
        set: set,
        message: "Set was successfully created."
    })

}

export const deleteSet = async(req, res, next) => {

    let { setId } = req.body;

    if ( !setId ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    let deletedSet;

    try {
        deletedSet = await Set.findByIdAndDelete(setId);
    }
    catch (err) {
        return next(err);
    }

    if (!deletedSet) {
        return res.status(400).json({
            err_code: 1,
            message: "Set not found."
        })
    }

    return res.status(200).json({
        set: deletedSet,
        message: "Set was successfully deleted."
    })

}

export const updateSet = async(req, res, next) => {

    let { setId, exerciseId, duration, count } = req.body;
    let exercise;

    if ( !exerciseId || !setId ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        exercise = await Exercise.findById(exerciseId)
    }
    catch (err) {
        return next(err)
    }

    if (!exercise) {
        return res.status(400).json({
            err_code: 2,
            message: "Exercise not found."
        })
    }

    if (exercise.isCountable) {
        if ( !count ) {
            return res.status(400).json({
                err_code: 1,
                message: "Please enter all required fields."
            })
        }
        if (count <= 0) {
            return res.status(400).json({
                err_code: 3,
                message: "Set count can not be less than 0."
            })
        }
        duration = null
    }
    else {
        if ( !duration ) {
            return res.status(400).json({
                err_code: 0,
                message: "Please enter all required fields."
            })
        }
        if (duration <= 0) {
            return res.status(400).json({
                err_code: 3,
                message: "Set duration can not be less than 0."
            })
        }
        count = null
    }
    
    let set;

    try {
        set = await Set.findByIdAndUpdate(setId, {
            exerciseId: exerciseId,
            count: count,
            duration: duration,
        }, {
            new: true
        })
    }
    catch (err) {
        return next(err)
    }

    if (!set) {
        return res.status(500).json({
            err_code: 4,
            message: "Error occured when updating set."
        })
    }

    return res.status(200).json({
        set: set,
        message: "Set was updated successfully."
    })

}