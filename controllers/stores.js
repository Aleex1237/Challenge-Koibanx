
const notesService = require('../services/stores');
const getAll = async (req,res,next) => {
    console.log(req);

    const notes = await notesService.getAll();
    res.json(
    {
        data: [notes],
        page: 1,
        pages: 100,
        limit: 10,
        total: 10000,
    }
    );
}

module.exports = { getAll };