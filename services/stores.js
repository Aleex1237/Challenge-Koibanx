const notesRepository = require('../repositories/stores');
const messages = require('../constants/messages');
const statusCode = require('../constants/statusCodes');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const getAll = async (limit = 10, page) => {
    page = (page - 1) * 10;
    
    const notes = await notesRepository.getAll(+limit, +page);
    const total = await notesRepository.getCount();

    const notesSorted = [];
    notes.forEach(note => {
            const noteSorted = {
            ID: note._id,
            Comercio: note.name,
            CUIT: note.cuit,
            Conceptos: note.concepts,
            BalanceActual: formatter.format(note.currentBalance),
            Activo: note.active === true ? 'Si' : 'No',
            UltimaVenta: note.lastSale.toLocaleString('es-AR'),
        }
        notesSorted.push(noteSorted);
    });

    return {
        notesSorted,
        page: page + 1,
        pages: Math.ceil(total / limit),
        limit,
        total
    };
}

const create = async (data) => {
    data.concepts = [];
    data.lastSale = new Date(data.lastSale).toISOString();
     data.concepts = [
        data.concept1,
        data.concept2,
        data.concept3,
        data.concept4,
        data.concept5,
        data.concept6
    ]; 

    delete data.concept1 
    delete data.concept2 
    delete data.concept3 
    delete data.concept4 
    delete data.concept5 
    delete data.concept6 
    
    const note = await notesRepository.create(data);

    if(!note) {
        const error = new Error(messages.INTERNAL_ERROR);
        error.status = statusCode.INTERNAL_ERROR;
        throw error;
    }

    const noteSorted = {
        ID: note._id,
        Comercio: note.name,
        CUIT: note.cuit,
        Conceptos: note.concepts,
        BalanceActual: formatter.format(note.currentBalance),
        Activo: note.active === true ? 'Si' : 'No',
        UltimaVenta: note.lastSale.toLocaleString('es-AR'),
    }

    return noteSorted;
}

module.exports = { getAll, create };