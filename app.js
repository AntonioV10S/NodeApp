import express from 'express';
import routes from './router/Router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { sequelize } from './db/conexion.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import Empleado from './model/EmpleadoModel.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use('/',routes);

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Servidor corriendo en el puerto ${port}`);
    } catch (error) {
        console.error(`Error ${error}`);
    }
});



