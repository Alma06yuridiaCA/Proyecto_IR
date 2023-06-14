const Sequelize = require('sequelize');
const db = require('../config/db');
const {uuid} = require('uuidv4');
const Usuarios = require('./Usuarios');

const Articulos = db.define('Articulos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'No ingresaste ninguna descripción'
        }
      }
    },
    unidades: {
      type: Sequelize.INTEGER, // Cambiado a INTEGER para representar unidades como número entero
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Unidades disponibles requeridas'
        }
      }
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2), // Cambiado a DECIMAL para representar precio con decimales (10 dígitos en total, 2 decimales)
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Precio requerido'
        }
      }
    }
  })


module.exports = Articulos;