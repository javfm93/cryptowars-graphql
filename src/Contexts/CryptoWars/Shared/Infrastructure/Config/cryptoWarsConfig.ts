import convict from 'convict';

const moocConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
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

// moocConfig.loadFile([
//   __dirname + '/default.json',
//   __dirname + '/' + moocConfig.get('env') + '.json'
// ]);

export default moocConfig;
