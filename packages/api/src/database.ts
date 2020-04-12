// OLD with SQLite
// import { Sequelize } from 'sequelize-typescript';
// // commmunicate to our database
// export const sequelize = new Sequelize({
//     database: 'chat',
//     dialect: 'sqlite',
//     username: 'root',
//     password: '',
//     storage: 'chat.db',
//     models: [__dirname + '/models'],
//     logging: false
// });

// NEW with POSTGRESQL
import { Sequelize } from 'sequelize-typescript';

const dbOptions = {
    models: [__dirname + '/models'],
    logging: false
};

// Communicate to our database
// @ts-ignore
export const sequelize = process.env.DATABASE_URL
? new Sequelize(process.env.DATABASE_URL, dbOptions)
: new Sequelize({
    ...dbOptions,
    database: 'chat',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'chat.db'
});