import { Router } from 'express';
import { User } from '../models/User';
import { Op } from 'sequelize';

export const usersRouter = Router();

// CRUD of the user in REST API

// get list of users
usersRouter.get('/', async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// get one user
usersRouter.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    const user = await User.findByPk(userID);
    res.json(user);
});


// Search for a user
usersRouter.get('/search', async (req, res, next) => {
    const query = req.query.q;
    try {
        const users = await User.findAll({
            where: {
                $or: [
                    { firstName: { [Op.like]: `%${query}%` } },
                    { lastName: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json(users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        })));
    } catch (err) {
        next();
    }
});


// update a user
usersRouter.patch('/:userID', async (req, res, next) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    try {
        await User.update(newUser, {
            where: { id: req.params.userID },
            returning: true
        });
        const user = await User.findByPk(req.params.userID);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// delete a user
// we should NEVER delete from the database, you store in a archive or you set a flag
usersRouter.delete('/:userID', async (req, res, next) => {
    try {
        User.destroy({
            where: { id: req.params.userID }
        })
        res.json({
            message: 'Successfully deleted user'
        })
    } catch (err) {
        next();
    }
});
