const db = require("../models");
const user = db.User;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
	register: async (request, response) => {
		try {
			const { username, email, password, age, firstName } = request.body;

			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(password, salt);

			const result = await user.create({
				username,
				firstName,
				email,
				password: hashPass,
				age,
			});
			response.status(200).send({
				status: true,
				result,
			});
		} catch (err) {
			response.status(400).send(err);
		}
	},
	login: async (request, response) => {
		const { email, password } = request.body;

		const userExist = await user.findOne({
			where: {
				email,
			},
		});

		if (!userExist)
			throw {
				status: false,
				message: "User not found",
			};

		const isValid = await bcrypt.compare(password, userExist.password);

		if (!isValid)
			throw {
				status: false,
				message: "Wrong password",
			};

		const payload = { id: userExist.id, isAdmin: userExist.isAdmin };
		const token = jwt.sign(payload, "JWT", { expiresIn: "5m" });

		try {
			response.status(200).send({
				status: true,
				message: "Login success",
				data: userExist,
				token,
			});
		} catch (error) {
			response.status(400).send(error);
		}
	},
};
