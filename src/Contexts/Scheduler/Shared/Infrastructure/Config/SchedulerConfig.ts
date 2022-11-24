import convict from 'convict';

const schedulerConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'integration', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  logLevel: {
    doc: 'Min Level of the log to show',
    format: String,
    env: 'LOG_LEVEL',
    default: 'info'
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
      default: 'scheduler-dev.db'
    },
    seeds: {
      doc: 'The route to the db seed',
      format: String,
      env: 'TYPEORM_SEEDS',
      default: 'src/Contexts/Scheduler/Shared/Infrastructure/Persistence/Migrations/*{.ts,.js}'
    }
  }
});

schedulerConfig.loadFile([__dirname + '/' + schedulerConfig.get('env') + '.json']);

export default schedulerConfig;
