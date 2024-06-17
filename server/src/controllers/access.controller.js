const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

const accessCtrl = {};

accessCtrl.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Correo no registrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Credenciales incorrectas',
                auth: false,
                token: null,
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '24h',
        });
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            auth: true,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

accessCtrl.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res
                .status(400)
                .json({ message: 'El correo ya esta en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET);

        res.status(201).json({
            atuh: true,
            token,
            message: 'Registro de usuario exitoso',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

module.exports = accessCtrl;
