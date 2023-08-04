const User = require('../models/user.model');

async function createUser(userData) {
  try {
    const { firstName, lastName, email } = userData;
    console.log('Datos del usuario recibidos:', userData);

    // Validar que los campos obligatorios están presentes en userData
    if (!firstName || !lastName || !email) {
      return { error: 'Todos los campos son obligatorios: firstName, lastName, email' };
    }

    const user = await User.create({ firstName, lastName, email });
    console.log('Usuario creado:', user);
    return user;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return { error: 'Ya existe un usuario con este correo electrónico.' };
    }
    return { error: 'Error al crear el usuario.' };
  }
}

async function findUserById(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado.' };
    }
    return user;
  } catch (error) {
    return { error: 'Error al obtener el usuario.' };
  }
}

async function findAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    return { error: 'Error al obtener los usuarios.' };
  }
}

async function updateUserById(userId, userData) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado.' };
    }

    // Validar si hay campos para actualizar
    if (Object.keys(userData).length === 0) {
      return { error: 'No hay campos para actualizar.' };
    }

    await user.update(userData);
    return user;
  } catch (error) {
    return { error: 'Error al actualizar el usuario.' };
  }
}

async function deleteUserById(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado.' };
    }
    await user.destroy();
    return { message: 'Usuario eliminado correctamente.' };
  } catch (error) {
    return { error: 'Error al eliminar el usuario.' };
  }
}

module.exports = {
  createUser,
  findUserById,
  findAllUsers,
  updateUserById,
  deleteUserById,
};