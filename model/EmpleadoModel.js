import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';

const Empleado = sequelize.define('Empleado', { 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaContratacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  horasTrabajadas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{
  timestamps: false
});


export default Empleado;