require("dotenv").config();
const express = require("express");
const db = require("./models");
const { userRouter, authRouter } = require("./routers");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
	response.send({
		message: "This is my API",
	});
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
	// db.sequelize.sync({ alter: true });
	console.log(`running @ ${process.env.PORT}`);
});
