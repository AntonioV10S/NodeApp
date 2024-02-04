import { getEmpleados, crearEmpleado, mostrarEmpleado,filtrarEmpleado } from '../controller/EmpleadoController.js';
import {  getTareas, agregarTareaEmpleado, calcularTotalSalarios} from '../controller/TareaController.js';
import express from 'express';

const router = express.Router();


router.get('/index', getEmpleados); 
router.post('/index', crearEmpleado); 
router.get('/buscar', mostrarEmpleado); 
router.post('/departamento', filtrarEmpleado); 

//router.get('/buscar/:departamento', mostrarEmpleado); 

router.get('/tarea', getTareas);
router.post('/tarea', agregarTareaEmpleado);

router.get('/totalsalarios', calcularTotalSalarios);

///router.post('/agregartareas', createtarea);




export default router;
