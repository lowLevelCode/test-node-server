const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

// Configuración de Sequelize
const sequelize = new Sequelize("postgres://super_admin:SomeSecretPassword@localhost:5432/test-postres");

// Definición del modelo de la entidad
const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});


sequelize.sync().then(() => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get("/users", async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    });

    app.post("/users", async (req, res) => {
        const { firstName, lastName, email } = req.body;
        const user = await User.create({ firstName, lastName, email });
        res.json(user);
    });
    const port = 3001;
    app.listen(port, () => {
        console.log("Server is running on port 3000");
    });
});
