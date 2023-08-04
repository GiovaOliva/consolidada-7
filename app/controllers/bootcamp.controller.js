const Bootcamp = require('../models/bootcamp.model');

async function createBootcamp(bootcampData) {
  try {
    const { title, cue, description } = bootcampData;
    console.log('Datos del bootcamp recibidos:', bootcampData);

    // Validar que los campos obligatorios están presentes en bootcampData
    if (!title || !cue || !description) {
      return { error: 'Todos los campos son obligatorios: title, cue, description' };
    }

    const bootcamp = await Bootcamp.create({ title, cue, description });
    console.log('Bootcamp creado:', bootcamp);
    return bootcamp;
  } catch (error) {
    return { error: 'Error al crear el bootcamp.' };
  }
}

async function findBootcampById(bootcampId) {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return { error: 'Bootcamp no encontrado.' };
    }
    return bootcamp;
  } catch (error) {
    return { error: 'Error al obtener el bootcamp.' };
  }
}

async function findAllBootcamps() {
  try {
    const bootcamps = await Bootcamp.findAll();
    return bootcamps;
  } catch (error) {
    return { error: 'Error al obtener los bootcamps.' };
  }
}

async function updateBootcampById(bootcampId, bootcampData) {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return { error: 'Bootcamp no encontrado.' };
    }

    // Validar si hay campos para actualizar
    if (Object.keys(bootcampData).length === 0) {
      return { error: 'No hay campos para actualizar.' };
    }

    await bootcamp.update(bootcampData);
    return bootcamp;
  } catch (error) {
    return { error: 'Error al actualizar el bootcamp.' };
  }
}

async function deleteBootcampById(bootcampId) {
  try {
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return { error: 'Bootcamp no encontrado.' };
    }
    await bootcamp.destroy();
    return { message: 'Bootcamp eliminado correctamente.' };
  } catch (error) {
    return { error: 'Error al eliminar el bootcamp.' };
  }
}

module.exports = {
  createBootcamp,
  findBootcampById,
  findAllBootcamps,
  updateBootcampById,
  deleteBootcampById,
};