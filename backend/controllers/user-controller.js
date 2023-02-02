import User from "../models/user-model.js"

export const getAllUsers = async(req, res, next) => {

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

export const addUser = async(req, res, next) => {

    let { firstName, lastName, email, password } = req.body;

    //firstName = firstName.trim()
    //lastName = lastName.trim()
    //email = email.trim()

    if (!firstName || !lastName || !email || !password) {
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

    let user;

    try {
        user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        user = user.save()
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