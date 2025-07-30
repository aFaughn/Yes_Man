'use strict';
import { Model } from 'sequelize';

export const Counter = (sequelize, DataTypes) => {
  class Counter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Counter.init({
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Counter',
  });
  return Counter;
};