require('dotenv').config();
const { Sequelize, Model } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// console.log(sequelize.models)

const { Genero,Pelicula,Personaje,User} = sequelize.models;

Personaje.belongsToMany(Pelicula,{through:"personaje_peliculas"});
Pelicula.belongsToMany(Personaje,{through:"personaje_peliculas"});

Genero.belongsToMany(Pelicula,{through:"Pelicula_generos"});
Pelicula.belongsToMany(Genero,{through:"Pelicula_generos"});


// Personaje.hasMany(Pelicula);
// Genero.hasMany(Pelicula);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};