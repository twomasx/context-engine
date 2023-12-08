const User = require('../models/user.model');
const Context = require('../models/context.model');
const { generateAuthToken } = require('../utils/auth');

const UserController = {
    create: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = generateAuthToken(user);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    read: async (req, res) => {
        try {
            const users = await User.find({}).populate('contexts');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findByIdAndUpdate(req.params.id, { name, email, password });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            // Delete the user
            const deletedUser = await User.findByIdAndDelete(id);

            // Delete associated contexts
            await Context.deleteMany({ user: id });

            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
    
module.exports = UserController;
