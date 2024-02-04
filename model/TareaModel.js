import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';
import Empleado from './EmpleadoModel.js';

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true 
  }
},
{
  timestamps: false
});


Empleado.hasMany(Tarea, { as: 'tareas', foreignKey: 'EmpleadoId' });


await Tarea.sync();
export default Tarea;
