import Empleado from '../model/EmpleadoModel.js';
import { sequelize } from '../db/conexion.js';

export const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        if (empleados.length > 0) {
            res.render('index', { empleados: empleados });
        } else {
            res.render('index', { message: "No existen empleados" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const crearEmpleado = async (req, res) => {
    try {
        const { name, fechaContratacion, salario, horasTrabajadas, departamento } = req.body;
        const nuevoEmpleado = await Empleado.create({ name, fechaContratacion, salario, horasTrabajadas, departamento });
        res.redirect('/index'); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const mostrarEmpleado = async (req, res) => {
    try {
        const empleados = await Empleado.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('departamento')), 'departamento']]
        });

        if (empleados.length > 0) {
            res.render('buscar', { empleados: empleados });
        } else {
            res.render('buscar', { message: "No se encontraron empleados en este departamento" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const filtrarEmpleado = async (req, res) => {
   
    try {
        const empleados = await Empleado.findAll({ where: { departamento: req.body.departamento } });
        if (empleados) {
            res.render('filtro', { getempleados: empleados });
        } else {
            res.render('filtro', { message: "No se encontraron empleados en este departamento" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}





// // Eliminar un empleado
// export const eliminarEmpleado = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const empleadoEliminado = await Empleado.destroy({ where: { id: id } });
//         if (empleadoEliminado) {
//             res.render('empleado', { message: "Empleado eliminado correctamente" });
//         } else {
//             res.render('empleado', { message: "No empleado no encontrado" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Actualizar los detalles de un empleado
// export const actualizarEmpleado = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, fechaContratacion, salario, horasTrabajadas, departamento } = req.body;
//         const empleadoActualizado = await Empleado.update(
//             { name, fechaContratacion, salario, horasTrabajadas, departamento },
//             { where: { id: id } }
//         );
//         if (empleadoActualizado) {
//             res.render('empleado', { message: "Empleado actualizado correctamente" });
//         } else {
//             res.render('empleado', { message: "Empleado no encontrado" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

