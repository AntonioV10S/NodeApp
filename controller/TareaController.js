import Empleado from "../model/EmpleadoModel.js";
import Tarea from "../model/TareaModel.js";

export const getTareas = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();

    if (empleados) {
      res.render("tarea", { empleados: empleados, tareas: tareas });
    } else {
      res.render("tarea", { message: "No existen empleados" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const agregarTareaEmpleado = async (req, res) => {
  try {
    const { EmpleadoId, taskName, description, horasTarea } = req.body;

    // Obtener el empleado por su ID
    const empleado = await Empleado.findByPk(EmpleadoId);

    if (!empleado) {
      throw new Error("Empleado no encontrado");
    }

    // Verificar si las horas trabajadas son suficientes para la tarea
    if (horasTarea > empleado.horasTrabajadas) {
      res.status(400).json({
        error:
          "Las horas trabajadas no son suficientes para completar esta tarea",
      });
      return;
    }

    // Crear la tarea y asociarla al empleado
    const tarea = await Tarea.create({
      taskName,
      description,
      horasTarea,
      EmpleadoId,
    });
    res.redirect("/tarea");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const calcularTotalSalarios = async (req, res) => {
  try {
    // Obtener todos los empleados
    const empleados = await Empleado.findAll();

    // Calcular el total de salarios
    let totalSalarios = 0;
    empleados.forEach((empleados) => {
      totalSalarios += empleados.salario;
    });

    // Ordenar los empleados por fecha de contratación
    empleados.sort((a, b) => a.fechaContratacion - b.fechaContratacion);

    // Calcular el total en dólares
    const totalSalariosUSD = totalSalarios / 1; // Suponiendo que el salario está en centavos

    // Renderizar la vista con los resultados
    res.render("totalSalarios", { totalSalariosUSD, empleados });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
