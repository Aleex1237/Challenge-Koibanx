const notesRepository = require('../repositories/stores');

const getAll = async () => {
    const notes = await notesRepository.getAll();

    return notes;
}

module.exports = { getAll };