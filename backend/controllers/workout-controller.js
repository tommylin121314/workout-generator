import Workout from "../models/workout-model.js"
import mongoose from "mongoose";

export const getAllWorkouts = async(req, res, next) => {

    let workouts;

    try {
        workouts = await Workout.find();
    }
    catch (err) {
        return next(err);
    }

    if (!workouts) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when fetching workouts."
        })
    }

    return res.status(200).json({
        workouts: workouts,
        message: "Workouts fetched successfully."
    })

}

export const getWorkoutById = async(req, res, next) => {

    const id = req.body.id;
    let workout;

    if (!id) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        workout = await Workout.findById(id);
    }
    catch (err) {
        return next(err)
    }

    if (!workout) {
        return res.status(400).json({
            err_code: 1,
            message: "Workout not found."
        })
    }

    return res.status(200).json({
        workout: workout,
        message: "Workout was successfully fetched."
    })

}

export const getPublicWorkouts = async(req, res, next) => {

    let workouts;

    try {
        workouts = await Workout.find({'isPublic': true});
    }
    catch (err) {
        return next(err);
    }

    if (!workouts) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when fetching workouts."
        })
    }

    return res.status(200).json({
        workouts: workouts,
        message: "Workouts fetched successfully."
    })

}

export const getUserWorkouts = async(req, res, next) => {

    let id = req.body.id;
    let workouts;

    if (!id) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        workouts = await Workout.find({'ownerId': mongoose.Types.ObjectId(id)});
    }
    catch (err) {
        return next(err);
    }

    if (!workouts) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when fetching workouts."
        })
    }

    return res.status(200).json({
        workouts: workouts,
        message: "Workouts fetched successfully."
    })

}

export const createWorkout = async(req, res, next) => {

    let {name, description, target, sets, isPublic} = req.body;

    if ( !name || !description || !sets || !target || isPublic === null ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    name = name.trim()
    description = description.trim()
    
    if ( !name || !description || !sets || !target || isPublic === null ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    let existingWorkoutWithName;

    try {
        existingWorkoutWithName = await Workout.findOne({"name": name})
    }
    catch(err) {
        return next(err)
    }

    if (existingWorkoutWithName) {
        return res.status(400).json({
            err_code: 2,
            message: "Workout with name already exists."
        })
    }

    let workout;

    try {
        workout = new Workout({
            name: name,
            description: description,
            sets: sets,
            target: target,
            isPublic: isPublic,
        })
        if (!isPublic) {
            if (!req.body.ownerId) {
                return res.status(400).json({
                    err_code: 0,
                    message: "Please enter all required fields."
                })
            }
            workout.ownerId = req.body.ownerId
        }
        workout = await workout.save()
    }
    catch (err) {
        return next(err)
    }

    if (!workout) {
        return res.status(500).json({
            err_code: 1,
            message: "Error occured when creating workout."
        })
    }

    return res.status(200).json({
        workout: workout,
        message: "Workout was successfully created."
    })

}

export const deleteWorkout = async(req, res, next) => {

    const id = req.body.id;

    if (!id) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    let deletedWorkout;

    try {
        deletedWorkout = await Workout.findById(id);
    }
    catch (err) {
        return res.status(500).json({
            err_code: 1,
            message: "Error occured when finding workout."
        })
    }

    if (!deletedWorkout) {
        return res.status(400).json({
            err_code: 2,
            message: "Workout not found."
        })
    }

    if (deletedWorkout.isPublic) {
        return res.status(500).json({
            err_code: 3,
            message: "Cannot delete public workout."
        })
    }

    const ownerId = req.body.ownerId;

    if (!ownerId) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    if ((mongoose.Types.ObjectId(ownerId)).equals(deletedWorkout.ownerId)) {
        try {
            deletedWorkout = await Workout.findByIdAndDelete(id);
        }
        catch (err) {
            return res.status(500).json({
                err_code: 1,
                message: "Error occured when deleting workout."
            })
        }
        return res.status(200).json({
            workout: deletedWorkout,
            message: "Workout was successfully deleted."
        })
    }
    else {
        return res.status(400).json({
            err_code: 4,
            message: "Do not have ownership over this workout."
        })
    }

}

export const updateWorkout = async(req, res, next) => {

    let {id, ownerId, name, description, sets, target} = req.body;
    let workout;

    if ( !id || !ownerId || !name || !description || !sets || !target ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    name = name.trim()
    description = description.trim()
    
    if ( !id || !ownerId || !name || !description || !sets || !target ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        workout = await Workout.findById(id);
    }
    catch (err) {
        return next(err)
    }

    if (!workout) {
        return res.status(400).json({
            err_code: 1,
            message: "Workout not found."
        })
    }

    if (!mongoose.Types.ObjectId(ownerId).equals(workout.ownerId)) {
        return res.status(400).json({
            err_code: 2,
            message: "Do not have access to this workout."
        })
    }

    try {
        workout = await Workout.findByIdAndUpdate(id, {
            name: name,
            description: description,
            target: target,
            sets: sets,
        }, {
            new: true
        })
    }
    catch (err) {
        return next(err)
    }

    if (!workout) {
        return res.status(500).json({
            err_code: 3,
            message: "Error occured when updating workout."
        })
    }

    return res.status(200).json({
        workout: workout,
        message: "Workout was successfully updated."
    })

}