'use strict';

import { Model, DataTypes, Sequelize, Attribute, PrimaryKey, AutoIncrement, NotNull } from 'sequelize';

// export default (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     username: DataTypes.STRING,
//     remoteId: DataTypes.STRING,
//     points: DataTypes.INTEGER,
//     trust: DataTypes.INTEGER,
//     inventory: DataTypes.STRING,
//     blackjack: DataTypes.STRING,
//     fishingXP: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

export class User extends Model {
  
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  id;

  @Attribute(DataTypes.STRING)
  @NotNull
  username;

  @Attribute(DataTypes.STRING)
  @NotNull
  remoteId;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  points;

  @Attribute(DataTypes.INTEGER)
  @Default(100)
  trust;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  fishingXP;

}