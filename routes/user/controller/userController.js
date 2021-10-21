const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const register = async (req, res) => {
	let body = req.body;
	const { firstName, lastName, username, email, password } = body;

	try {
		const createdUser = new User({
			firstName,
			lastName,
			username,
			email,
			password,
		});
		let savedUser = await createdUser.save();
		res.json({ message: "SUCCESS", payload: savedUser });
	} catch (err) {
		res.status(500).json({
			message: "ERROR",
			error: err.message,
		});
	}
};

const login = async (req, res) => {
	const { username, password, email } = req.body;

	try {
		let foundUser = await User.findOne({ username: username });

		if (!foundUser) {
			let foundEmail = await User.findOne({ email: email });

			if (!foundUser && !foundEmail) {
				res.status(500).json({
					message: "ERROR",
					error: "Invalid login credentials",
				});
			} else {
				let comparedPassword = bcrypt.compare(password, foundEmail.password);

				if (!comparedPassword) {
					res.status(500).json({
						messsage: "ERROR",
						error: "Please check your email and password",
					});
				} else {
					let jwtToken = jwt.sign(
						{
							email: foundEmail.email,
							username: foundEmail.username,
						},
						process.env.JWT_SECRET,
						{ expiresIn: "24h" }
					);
					// console.log(foundEmail)
					res.json({ message: "SUCCESS", payload: jwtToken });
				}
			}
		} else {
			let passwordComparer = await bcrypt.compare(password, foundUser.password);

			if (!passwordComparer) {
				return res.status(500).json({
					message: "ERROR",
					error: "Please check username and password",
				});
			} else {
				let jwtToke = jwt.sign(
					{
						email: foundUser.email,
						username: foundUser.username,
					},
					process.env.JWT_SECRET,
					{ expiresIn: "24h" }
				);
				// console.log(foundUser)
				res.json({ message: "SUCCESS", payload: jwtToke });
			}
		}
	} catch (error) {
		res.status(500).json({
			message: "ERROR",
			error: error.message,
		});
	}
};

const getUserInfo = async (req, res) => {
    try {
        const decodedData = res.locals.decodedData;
        const foundUser = await User.findOne({ email: decodedData.email })
            .populate('posts');

        res.json({ message: "SUCCESS", payload: foundUser})
    } catch(error) {
        res.status(404).json({ message: "User not found", error: error.message })
    }
}

module.exports = {
	register,
	login,
    getUserInfo
};
