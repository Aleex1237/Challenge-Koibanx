const chai = require('chai');
const sinon = require('sinon');
const authService = require('../services/auth');
const usersRepository = require('../repositories/users');
const bcrypt = require('bcrypt-nodejs')

let mockedUsersRepository

const testEmail = 'test@test.com';
const testPassword = 'test';
const testSalt = bcrypt.genSaltSync(5);
const testPasswordEncrypted = bcrypt.hashSync(testPassword, testSalt);
const token = 'token';


describe('test authService', () => {

  beforeEach(() => {
    mockedUsersRepository = sinon.mock(usersRepository);
    spiedBcrypt = sinon.spy(bcrypt);
  });
  afterEach(() => {
    mockedUsersRepository.verify();
  });

  it('check User', async () => {

    const expectedUser = [{
      username: testEmail,
      password: testPasswordEncrypted
    }];

    const expectedReturn = {
      expectedUser,
      token: token,
    };

    mockedUsersRepository
      .expects('getByEmail')
      .withExactArgs(testEmail)
      .resolves(expectedUser)

    const result = await authService.checkUser(testEmail, testPassword);

    chai.assert.strictEqual(1, spiedBcrypt.compareSync.callCount);
    chai.assert.equal(expectedReturn.expectedUser[0], result.user[0], 'compare the results');
    chai.assert.exists(result.token)
  });
}); 