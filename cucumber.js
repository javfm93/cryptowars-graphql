const CryptoWarsBackend = [
  '--require-module ts-node/register',
  '--require tests/apps/CryptoWars/backend/features/step_definitions/*.steps.ts',
  'tests/apps/CryptoWars/backend/features/**/*.feature'
].join(' ');

module.exports = {
  CryptoWarsBackend
};
// todo: https://www.adictosaltrabajo.com/2020/03/23/configuracion-de-cucumber-js-y-jest-cucumber-en-visual-studio-code-con-typescript/
