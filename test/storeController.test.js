const chai = require('chai');
const sinon = require('sinon');
const storeController = require('../controllers/stores');
const storeService = require('../services/stores');
const messages = require('../constants/messages');
const statusCodes = require('../constants/statusCodes');

let mockedStoreService, res, stubStatus, spyJson, spyNext

const expectedNameStore = 'storeTest';
const expectedCuit = '1234567';
const expectedCurrentBalance = 1000;
const expectedLastSale = '2001/01/02 15:14:00';
const expectedConcept1 = 'concept1';
const expectedConcept2 = 'concept2';
const expectedConcept3 = 'concept3';
const expectedConcept4 = 'concept4';
const expectedConcept5 = 'concept5';
const expectedConcept6 = 'concept6';

describe('test stores', () => {

    beforeEach(() => {
        mockedStoreService = sinon.mock(storeService);
        spyJson = sinon.spy();
        stubStatus = sinon.stub();
        stubStatus.returns({ json: spyJson });
        res = { status: stubStatus };
        spyNext = sinon.spy();
    });
    afterEach(() => {
        mockedStoreService.verify();
    });

    it('getAll success', async () => {
        const expectedLimit = 10;
        const expectedSkip = 1;

        const req = {
            query: { page: expectedLimit, limit: expectedSkip }
        };

        const expectedData = {
            data: [
                {
                    ID: "1",
                    Comercio: "storeTest1",
                    CUIT: "20951402",
                    Conceptos: [
                        "store",
                        "almacen",
                        "tienda"
                    ],
                    BalanceActual: "$2,000.00",
                    Activo: "Si",
                    UltimaVenta: "3/3/2022 16:13:58",
                },
            ],
            page: 1,
            pages: 1,
            limit: 10,
            total: 1
        }

        const expectedJsonResult = {
            expectedData,
        };


        mockedStoreService
            .expects('getAll')
            .withExactArgs(req.query.limit, req.query.page)
            .resolves(expectedData);

        await storeController.getAll(req, res, spyNext);

        chai.assert.equal(
            spyJson.calledOnce,
            true,
            'asserts json is called 1 time'
        );
        chai.assert.equal(
            spyJson.args[0][0].data,
            expectedJsonResult.expectedData.data,
            'expected Json is equal to json returned');

        chai.assert.equal(
            spyJson.args[0][0].data,
            expectedJsonResult.expectedData.data,
            'expected Json is equal to json returned');

        chai.assert.isArray(spyJson.args[0][0].data);
        chai.assert.isObject(spyJson.args[0][0].data[0]);
        chai.assert.exists(spyJson.args[0][0].page);
        chai.assert.isNumber(spyJson.args[0][0].page);

        chai.assert.exists(spyJson.args[0][0].pages);
        chai.assert.isNumber(spyJson.args[0][0].pages);

        chai.assert.exists(spyJson.args[0][0].limit);
        chai.assert.isNumber(spyJson.args[0][0].limit);

        chai.assert.exists(spyJson.args[0][0].total);
        chai.assert.isNumber(spyJson.args[0][0].total);


    });

    it('getAll error', async () => {
        const expectedLimit = 15;
        const expectedSkip = 0;

        const req = {
            query: { page: expectedLimit, limit: expectedSkip }
        };


        const expectedError = new Error('The limit is out range');

        mockedStoreService.expects('getAll')
            .withExactArgs(req.query.limit, req.query.page)
            .rejects(expectedError);

        await storeController.getAll(req, res, spyNext);

        chai.assert.equal(spyNext.args[0][0], expectedError);
        chai.assert.equal(spyNext.calledOnce, true, 'next is called 1 time')
    })

    it('create success', async () => {

        const req = {
            body: {
                name: expectedNameStore,
                cuit: expectedCuit,
                currentBalance: expectedCurrentBalance,
                lastSale: expectedLastSale,
                concept1: expectedConcept1,
                concept2: expectedConcept2,
                concept3: expectedConcept3,
                concept4: expectedConcept4,
                concept5: expectedConcept5,
                concept6: expectedConcept6,
            }
        }

        const expectedStore = {
            ID: "1",
            Comercio: "storeTest1",
            CUIT: "20951402",
            Conceptos: [
                "store",
                "almacen",
                "tienda"
            ],
            BalanceActual: "$2,000.00",
            Activo: "Si",
            UltimaVenta: "3/3/2022 16:13:58",
        }

        const expectedJsonResult = {
            status: statusCodes.RESPONSE_OK_CREATED,
            msg: messages.RESPONSE_OK_CREATED,
            expectedStore
        }

        mockedStoreService
            .expects('create')
            .withExactArgs(req.body)
            .resolves(expectedStore);

        await storeController.create(req, res, spyNext);

        chai.assert.equal(
            res.status.calledOnce,
            true,
            'asserts status is called 1 time'
        );
        chai.assert.equal(
            res.status.args[0],
            201,
            'asserts status parameter is 200'
        );
        chai.assert.equal(
            spyJson.calledOnce,
            true,
            'asserts json is called 1 time'
        );

        chai.assert.isObject(spyJson.args[0][0], 'is an object');
        chai.assert.equal(spyJson.args[0][0].msg, expectedJsonResult.msg, 'msg');
        chai.assert.equal(spyJson.args[0][0].status, expectedJsonResult.status);


    })
});