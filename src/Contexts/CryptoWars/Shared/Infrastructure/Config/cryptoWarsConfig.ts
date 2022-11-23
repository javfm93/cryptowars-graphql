import convict from 'convict';

const cryptoWarsConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'integration', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  checkTasksEveryInMs: {
    doc: 'Time between checks of tasks to process',
    format: Number,
    env: 'CHECK_TASKS_EVERY_IN_MS',
    default: '1000'
  },
  typeorm: {
    database: {
      doc: 'The database name',
      format: String,
      env: 'TYPEORM_DATABASE',
      default: 'crypto-wars-dev.db'
    },
    seeds: {
      doc: 'The route to the db seed',
      format: String,
      env: 'TYPEORM_SEEDS',
      default: 'src/Contexts/CryptoWars/Shared/Infrastructure/Persistence/Migrations/*{.ts,.js}'
    }
  }
});

cryptoWarsConfig.loadFile([__dirname + '/' + cryptoWarsConfig.get('env') + '.json']);

export default cryptoWarsConfig;
