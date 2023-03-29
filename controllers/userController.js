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
	updateUserByID: async (request, response) => {
		await User.findAll({
			where: {
				id: request.params.id,
			},
		}).then(async result => {
			if (result) {
				await User.update({ ...request.body }, { where: { id } })
					.then(updateResult => {
						response.status(200).send(updateResult);
					})
					.catch(updateError => {
						response.status(400).send(updateError);
					});
			} else {
				response.status(404).send("Not Found");
			}
		});
	},
	deleteUserByID: async (request, response) => {
		await User.destroy({
			where: {
				id: request.params.id,
			},
		})
			.then(result => {
				response.status(200).send(result);
			})
			.catch(error => {
				response.status(404).send(error);
			});
	},
};
