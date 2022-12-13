const { default: JestHasteMap } = require('jest-haste-map');
const { beforeEach } = require('node:test');
const { describe } = require('yargs');
const LoginRepository = require('../../../repositories/login.repository');

const { findOneUser } = require('../../fixtures/login.fixtures');

const mockLoginModel = () => ({ findOne: JestHasteMap.fn() });

describe('Login Repository layer test', () => {
  let loginRepository = new LoginRepository();
  loginRepository.Users = mockLoginModel();

  beforeEach(() => {
    JestHasteMap.resetAllMocks();
  });

  test('findOne Methods toHaveBeenCalled', async () => {
    const users = await loginRepository.findOne;
  });
});
