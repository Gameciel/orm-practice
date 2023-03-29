const jwt = require("jsonwebtoken");

module.exports = {
	verifyToken: (request, response, next) => {
		let token = request.headers.authorization;

		if (!token) throw "token is empty";

		/*
		eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2
		UsImlhdCI6MTY4MDA5ODgxMCwiZXhwIjoxNjgwMDk5MTEwfQ.2pJoyG0jfx9Ankiz8IK
		3tOf-LBXij_xVWx0fQEZlRdo
		*/
		try {
			const isVerified = jwt.verify(token, "JWT");
			if (!isVerified) throw "Unauthorized";

			request.user.isAdmin = isVerified.isAdmin;

			next();
		} catch (error) {
			response.status(400).send(error);
		}
	},
	checkRole: (request, response, next) => {
		if (request.user.isAdmin) return next();
		response.status(400).send("Anda bukan admin");
	},
};
