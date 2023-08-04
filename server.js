const express = require('express');
const { json } = require('body-parser');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');
const db = require('./app/config/db.config');

const app = express();

app.use(json());

// Rutas para usuarios
app.post('/api/users', userController.createUser);
app.get('/api/users', userController.findAllUsers);
app.get('/api/users/:userId', userController.findUserById);
app.put('/api/users/:userId', userController.updateUserById);
app.delete('/api/users/:userId', userController.deleteUserById);

// Rutas para bootcamps
app.post('/api/bootcamps', bootcampController.createBootcamp);
app.get('/api/bootcamps', bootcampController.findAllBootcamps);
app.get('/api/bootcamps/:bootcampId', bootcampController.findBootcampById);
app.post('/api/bootcamps/:bootcampId/addUser', bootcampController.addUser);

// Configurar la conexión y sincronizar los modelos

require('./app/models/index');

async function initializeDatabase() {
  try {
    await db.sync({ force: false });
    console.log("Conexión con la base de datos establecida correctamente.");
    console.log("Base de datos y tablas sincronizadas correctamente.");

    await userController.createUser({
      body: {
        firstName: "Mateo",
        lastName: "Díaz",
        email: "mateo.diaz@correo.com"
      }
    });

    await userController.createUser({
      body: {
        firstName: "Santiago",
        lastName: "Mejías",
        email: "santiago.mejias@correo.com"
      }
    });

    await userController.createUser({
      body: {
        firstName: "Lucas",
        lastName: "Rojas",
        email: "lucas.rojas@correo.com"
      }
    });

    await userController.createUser({
      body: {
        firstName: "Facundo",
        lastName: "Fernandez",
        email: "facundo.fernandez@correo.com"
      }
    });

    await bootcampController.createBootcamp({
      body: {
        title: "Introduciendo El Bootcamp De React.",
        cue: 10,
        description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
      }
    });

    await bootcampController.createBootcamp({
      body: {
        title: "Bootcamp Desarrollo Web Full Stack.",
        cue: 12,
        description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
      }
    });

    await bootcampController.createBootcamp({
      body: {
        title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
        cue: 18,
        description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
      }
    });
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
}

initializeDatabase();

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});