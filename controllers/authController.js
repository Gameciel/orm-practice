const db = require("../models");
const user = db.User;

module.exports = {
	register: async (request, response) => {
		try {
			const result = await user.create(request.body);
			response.status(200).send({
				status: true,
				result,
			});
		} catch (err) {
			response.status(400).send(err);
		}
	},
};
