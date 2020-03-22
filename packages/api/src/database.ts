import { Sequelize } from 'sequelize-typescript';

// commmunicate to our database
export const sequelize = new Sequelize({
    database: 'chat',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'chat.db',
    models: [__dirname + '/models'],
    logging: false
});