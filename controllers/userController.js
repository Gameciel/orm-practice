const { User } = require("../models");

module.exports = {
	getAllUser: async (request, response) => {
		try {
			const data = await User.findAll({
				attributes: ["id", "username", "email", "age"],
			});
			response.status(200).send({
				status: true,
				data,
			});
		} catch (err) {
			response.status(400).send(err);
		}
	},
	getUserById: async (request, response) => {
		try {
			const data = await User.findAll({
				where: {
					id: request.params.id,
				},
			});

			response.status(200).send({
				status: true,
				data,
			});
		} catch (error) {
			response.status(400).send(error);
		}
	},
	getTotalUser: async (request, response) => {
		try {
			const data = await User.findAll();
			console.log(`masuk`);
			response.status(200).send({
				status: true,
				total: data.length,
			});
		} catch (err) {
			response.status(400).send(err);
		}
	},
};
