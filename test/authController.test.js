const chai = require('chai');
const sinon = require('sinon');
const authController = require('../controllers/auth');
const authService = require('../services/auth');
const messages = require('../constants/messages');
const statusCodes = require('../constants/statusCodes');

let mockedAuthService, stubStatus, spyJson, spyNext;

describe('test authController', () => {

    beforeEach(() => {
        mockedAuthService = sinon.mock(authService);
        spyJson = sinon.spy();
        stubStatus = sinon.stub();
        res = { status: stubStatus };
        stubStatus.returns({ json: spyJson });
        spyNext = sinon.spy();
    });
    afterEach(() => {
        mockedAuthService.verify();
    });


    it('login success', async () => {
        const expectedEmail = 'test@koibanx.com';
        const expectedPassword = 'test';
        const req = {
            body: { email: expectedEmail, password: expectedPassword }
        };

        const expectedAuth = {
            user: [
                {
                    _id: 1,
                    username: expectedEmail,
                }
            ],
            token: 'token'
        }

        const expectedJsonResult = {
            status: statusCodes.RESPONSE_OK,
            msg: messages.RESPONSE_OK,
            user: expectedEmail,
            token: `Basic ${expectedAuth.token}`
        };

        mockedAuthService
            .expects('checkUser')
            .withExactArgs(req.body.email, req.body.password)
            .resolves(expectedAuth);

        await authController.login(req, res, spyNext);

        chai.assert.equal(
            res.status.calledOnce,
            true,
            'asserts status is called 1 time'
        );
        chai.assert.equal(
            res.status.args[0],
            200,
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
        chai.assert.equal(spyJson.args[0][0].user, expectedJsonResult.user);
        chai.assert.equal(spyJson.args[0][0].token, expectedJsonResult.token);
    });

    it('login error', async () => {
        const expectedEmail = 'testerror@koibanx.c';
        const expectedPassword = 'test';
        const req = {
            body: { email: expectedEmail, password: expectedPassword }
        };

        const expectedError = new Error(messages.INVALID_EMAIL);

        mockedAuthService
            .expects('checkUser')
            .withExactArgs(req.body.email, req.body.password)
            .rejects(expectedError);

        await authController.login(req, res, spyNext);

        chai.assert.equal(spyNext.args[0][0], expectedError);
        chai.assert.equal(spyNext.calledOnce, true, 'next is called 1 time')
    });

}); 