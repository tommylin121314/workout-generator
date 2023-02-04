import User from "../models/user-model.js"
import bcrypt from "bcryptjs"

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

    const query = req.query;
    let username = query.username;
    let password = query.password;

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

    const id = req.params.id;
    let { firstName, lastName, username, displayName, password } = req.body;

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

    const id = req.params.id
    let deletedUser;

    try {
        deletedUser = await User.findByIdAndDelete(id)
    }
    catch (err) {
        return next(err)
    }

    if (!deletedUser) {
        res.status(500).json({
            err_code: 0,
            message: "Error occured when deleting user."
        })
    }

    return res.status(200).json({
        user: deletedUser,
        message: "User was successfully deleted.",
    })

}