import User from "../models/user-model.js"
import bcrypt from "bcryptjs"
import Exercise from "../models/exercise-model.js"
import Workout from "../models/workout-model.js"

export const getAllUsers = async (req, res, next) => {

    let users;

    try {
        users = await User.find();
    }
    catch (err) {
        return next(err);
    }

    if (!users) {
        return res.status(500).json({
            err_code: 0,
            message: "Unexpected error occured.",
        })
    }

    return res.status(200).json({
        users: users,
    })

}

export const getUserById = async (req, res, next) => {

    const id = req.body.id;

    if (!id) {
        return res.status(400).json({
            err_code: 1,
            message: "Please enter all required fields."
        })
    }

    let user;

    try {
        user = await User.findById(id);
    }
    catch (err) {
        return next(err);
    }

    if (!user) {
        return res.status(500).json({
            err_code: 0,
            message: "Unexpected error occured."
        })
    }

    return res.status(200).json({
        user: user,
        message: "User fetched."
    })

}

export const addUser = async (req, res, next) => {

    let { firstName, lastName, username, displayName, password } = req.body;

    if (!firstName || !lastName || !username || !password || !displayName) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    firstName = firstName.trim()
    lastName = lastName.trim()
    username = username.trim()
    displayName = displayName.trim()

    if (!firstName || !lastName || !username || !password || !displayName) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    if (password.includes(" ")) {
        return res.status(400).json({
            err_code: 1,
            message: "Password can not include any spaces."
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            err_code: 2,
            message: "Password must be atleast 6 characters long."
        })
    }

    let encrypted_password = bcrypt.hashSync(password)
    let user;

    try {
        user = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            displayName: displayName,
            password: encrypted_password,
            favoriteExercises: [],
            favoriteWorkouts: [],
        });
        user = await user.save()
    }
    catch (err) {
        return next(err)
    }

    if (!user) {
        return res.status(500).json({
            err_code: 3,
            message: "Error occured when creating new user."
        })
    }

    return res.status(200).json({
        user: user,
        message: "New user was successfully created."
    })

}

export const login = async (req, res, next) => {

    let {username, password} = req.body

    if ( !username || !password ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    username = username.trim();
    let existingUser;

    if ( !username || !password ) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        existingUser = await User.findOne({ 
            username: username 
        })
    }
    catch (err) {
        return next(err)
    }

    if (!existingUser) {
        return res.status(400).json({
            err_code: 1,
            message: "Incorrect username or password."
        })
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
        return res.status(400).json({
            err_code: 2,
            message: "Incorrect username or password."
        })
    }

    return res.status(200).json({
        message: "Login successful."
    })

}

export const updateUser = async (req, res, next) => {

    let { id, firstName, lastName, username, displayName, password } = req.body;

    if (!firstName || !lastName || !username || !displayName || !password) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    firstName = firstName.trim()
    lastName = lastName.trim()
    username = username.trim()
    displayName = displayName.trim()

    if (!firstName || !lastName || !username || !displayName || !password) {
        return res.status(400).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    if (password.includes(" ")) {
        return res.status(400).json({
            err_code: 1,
            message: "Password can not include any spaces."
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            err_code: 2,
            message: "Password must be atleast 6 characters long."
        })
    }

    let encrypted_password = bcrypt.hashSync(password)
    let user;

    try {
        user = await User.findByIdAndUpdate(id, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            displayName: displayName,
            password: encrypted_password
        }, {
            new: true,
        })
    }
    catch (err) {
        return next(err)
    }

    if (!user) {
        return res.status(500).json({
            err_code: 3,
            message: "Error occured when updating user."
        })
    }

    return res.status(200).json({
        user: user,
        message: "User was successfully updated."
    })

}

export const deleteUser = async(req, res, next) => {

    const id = req.body.id
    let deletedUser;

    try {
        deletedUser = await User.findByIdAndDelete(id)
    }
    catch (err) {
        return next(err)
    }

    if (!deletedUser) {
        return res.status(500).json({
            err_code: 0,
            message: "Error occured when deleting user."
        })
    }

    return res.status(200).json({
        user: deletedUser,
        message: "User was successfully deleted.",
    })

}

export const addFavoriteExercise = async(req, res, next) => {
    
    let { id, exerciseId } = req.body;
    let user;
    let updatedUser;
    let exercise;

    if ( !id || !exerciseId ) {
        return res.status(500).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        user = await User.findById(id);
        exercise = await Exercise.findById(exerciseId);

        if (!user) {
            return res.status(400).json({
                err_code: 1,
                message: "User not found."
            })
        }
        if (!exercise) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise not found."
            })
        }

        if (user.favoriteExercises.includes(exerciseId)) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise already in user favorites."
            })
        }
        if (exercise.favorites.includes(id)) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise already in user favorites."
            })
        }

        user.favoriteExercises.push(exerciseId)
        exercise.favorites.push(id)
        updatedUser = await user.save()
        exercise = await exercise.save()

    }
    catch (err) {
        return next(err);
    }

    if (!user || !updatedUser || !exercise) {
        return res.status(500).json({
            err_code: 2,
            message: "Error occured when adding exercise to favorites.",
        })
    }

    return res.status(200).json({
        user: updatedUser,
        exercise: exercise,
        message: "Exercise was successfully favorited."
    })

}

export const removeFavoriteExercise = async(req, res, next) => {
    
    let { id, exerciseId } = req.body;
    let user;
    let updatedUser;
    let exercise;

    if ( !id || !exerciseId ) {
        return res.status(500).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        user = await User.findById(id);
        exercise = await Exercise.findById(exerciseId);

        if (!user) {
            return res.status(400).json({
                err_code: 1,
                message: "User not found."
            })
        }
        if (!exercise) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise not found."
            })
        }

        if (!user.favoriteExercises.includes(exerciseId)) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise was not found in user favorites."
            })
        }
        if (!exercise.favorites.includes(id)) {
            return res.status(400).json({
                err_code: 1,
                message: "Exercise was not found in user favorites."
            })
        }

        user.favoriteExercises.remove(exerciseId);
        exercise.favorites.remove(id);
        updatedUser = await user.save();
        exercise = await exercise.save();
    }
    catch (err) {
        return next(err);
    }

    if (!user || !updatedUser || !exercise) {
        return res.status(500).json({
            err_code: 2,
            message: "Error occured when removing exercise from favorites.",
        })
    }

    return res.status(200).json({
        user: updatedUser,
        exercise: exercise,
        message: "Exercise was successfully removed from favorites."
    })

}

export const addFavoriteWorkout = async(req, res, next) => {
    
    let { id, workoutId } = req.body;
    let user;
    let updatedUser;
    let workout;

    if ( !id || !workoutId ) {
        return res.status(500).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        user = await User.findById(id);
        workout = await Workout.findById(workoutId);

        if (!user) {
            return res.status(400).json({
                err_code: 1,
                message: "User not found."
            })
        }
        if (!workout) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout not found."
            })
        }

        if (user.favoriteWorkouts.includes(workoutId)) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout already in user favorites."
            })
        }
        if (workout.favorites.includes(id)) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout already in user favorites."
            })
        }

        user.favoriteWorkouts.push(workoutId)
        workout.favorites.push(id)
        updatedUser = await user.save()
        workout = await workout.save()

    }
    catch (err) {
        return next(err);
    }

    if (!user || !updatedUser || !workout) {
        return res.status(500).json({
            err_code: 2,
            message: "Error occured when adding workout to favorites.",
        })
    }

    return res.status(200).json({
        user: updatedUser,
        workout: workout,
        message: "Workout was successfully favorited."
    })

}

export const removeFavoriteWorkout = async(req, res, next) => {
    
    let { id, workoutId } = req.body;
    let user;
    let updatedUser;
    let workout;

    if ( !id || !workoutId ) {
        return res.status(500).json({
            err_code: 0,
            message: "Please enter all required fields."
        })
    }

    try {
        user = await User.findById(id);
        workout = await Workout.findById(workoutId);

        if (!user) {
            return res.status(400).json({
                err_code: 1,
                message: "User not found."
            })
        }
        if (!workout) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout not found."
            })
        }

        if (!user.favoriteWorkouts.includes(workoutId)) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout was not found in user favorites."
            })
        }
        if (!workout.favorites.includes(id)) {
            return res.status(400).json({
                err_code: 1,
                message: "Workout was not found in user favorites."
            })
        }

        user.favoriteWorkouts.remove(workoutId);
        workout.favorites.remove(id);
        updatedUser = await user.save();
        workout = await workout.save();
    }
    catch (err) {
        return next(err);
    }

    if (!user || !updatedUser || !workout) {
        return res.status(500).json({
            err_code: 2,
            message: "Error occured when removing workout from favorites.",
        })
    }

    return res.status(200).json({
        user: updatedUser,
        workout: workout,
        message: "Workout was successfully removed from favorites."
    })

}