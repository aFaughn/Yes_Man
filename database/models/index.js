'use strict';

import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);

import cfg from '../../config/database.js';
let config = cfg[env];

export const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ES6 async model loader
const loadModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
      );
    });

  for (const file of files) {
    const module = await import(path.join(__dirname, file));
    const modelDef = module.default || module;
    const model = modelDef(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
};

await loadModels();

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;