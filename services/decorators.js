const storeRepository = require('../repositories/stores');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
class Store {
    constructor(data) {
        this.ID = data.id;
        this.Comercio = data.name;
        this.CUIT = data.cuit;
        this.Conceptos = data.concepts;
        this.BalanceActual = data.currentBalance;
        this.Activo = data.active;
        this.UltimaVenta = data.lastSale;
    }
}


class StoreBalanceActualDecorator {
    constructor(data) {
        Object.assign(this, data);
        this.BalanceActual = formatter.format(data.BalanceActual);
    }
}


class StoreActivoDecorator {
    constructor(data) {
        Object.assign(this, data);
        this.Activo = data.Activo === true ? "Si" : "No";
    }
}

class StoreUltimVentaDecorator {
    constructor(data) {
        Object.assign(this, data);
        this.UltimaVenta = data.UltimaVenta.toLocaleString('es-AR');
    }
}

const getAllDecorated = async (limit, skip) => {
    let dataNoFormated = await storeRepository.getAll(+limit, +skip);

    const dataFormated = []
    dataNoFormated.forEach(store => {
        store = new Store(store);
        store = new StoreBalanceActualDecorator(store);
        store = new StoreActivoDecorator(store);
        store = new StoreUltimVentaDecorator(store);
        dataFormated.push(store)
    })

    return dataFormated;
}

const createDecorated = async (data) => {
    data.concepts = [];
    data.concepts = [
        data.concept1,
        data.concept2,
        data.concept3,
        data.concept4,
        data.concept5,
        data.concept6
    ];
    data.lastSale = new Date(data.lastSale).toISOString();

    let dataNoFormated = await storeRepository.create(data);

    let dataFormated = new Store(dataNoFormated);
    dataFormated = new StoreBalanceActualDecorator(dataFormated);
    dataFormated = new StoreActivoDecorator(dataFormated);
    dataFormated = new StoreUltimVentaDecorator(dataFormated);

    return dataFormated;
}
module.exports = { getAllDecorated, createDecorated }