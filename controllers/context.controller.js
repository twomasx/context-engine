const { Context, User } = require('../models');


module.exports = {
    getContext: async (req, res) => {
        try {
            const { contextId } = req.params;
            
            const context = await Context.findById(contextId);
            
            if (!context) {
                return res.status(404).json({ message: 'Context not found' });
            }
            
            return res.status(200).json({ context });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getContexts: async (req, res) => {
        try {
            const contexts = await Context.find();
            
            return res.status(200).json({ contexts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getContext: async (req, res) => {
        try {
            const { userId } = req.params;
            
            const user = await User.findById(userId).populate('contexts');
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const contexts = user.contexts;
            
            return res.status(200).json({ contexts });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateContext: async (req, res) => {
        try {
            const { userId, contextId, contextData } = req.body;
            
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const context = await Context.findById(contextId);
            
            if (!context) {
                return res.status(404).json({ message: 'Context not found' });
            }
            
            context.set(contextData);
            await context.save();
            
            return res.status(200).json({ message: 'Context updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteContext: async (req, res) => {
        try {
            const { userId, contextId } = req.params;
            
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const context = await Context.findById(contextId);
            
            if (!context) {
                return res.status(404).json({ message: 'Context not found' });
            }
            
            await context.remove();
            
            user.contexts = user.contexts.filter(id => id.toString() !== contextId);
            await user.save();
            
            return res.status(200).json({ message: 'Context deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
