const db = require('../config/db.config');

const User = require('./user.model'); // Importa el modelo User (si lo tienes)
const Bootcamp = require('./bootcamp.model'); // Importa el modelo Bootcamp (si lo tienes)
User(db);
Bootcamp(db);

async function syncModels() {
  try {
    await db.authenticate();
    console.log('Conexión con la base de datos establecida correctamente.');

    await db.sync({ force: true }); 
    console.log('Base de datos y tablas sincronizadas correctamente.');

  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
}

syncModels();