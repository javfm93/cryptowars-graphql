import glob from 'glob';

export class ComponentDiscovery {
  constructor() {}

  static scan() {
    console.log('Starting Component Discovery Process');
    this.scanControllers();
    this.scanCommandHandlers();
    this.scanQueryHandlers();
    this.scanDomainEventHandlers();
    this.scanRepositories();
    console.log('Finished Component Discovery Process \n');
    return this;
  }

  static scanControllers() {
    const dir = __dirname + '/../Controllers/**/*Controller.ts';
    const files = this.loadFilesMatching(dir);
    console.debug(` - Discovered ${files.length} controller files`);
  }

  static scanCommandHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*CommandHandler.ts';
    const files = this.loadFilesMatching(dir);
    console.debug(` - Discovered ${files.length} command handlers files`);
  }

  static scanQueryHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*QueryHandler.ts';
    const files = this.loadFilesMatching(dir);
    console.debug(` - Discovered ${files.length} query handlers files`);
  }

  static scanDomainEventHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*On*.ts';
    const files = this.loadFilesMatching(dir);
    console.debug(` - Discovered ${files.length} domain event handlers files`);
  }

  static scanRepositories() {
    const dir = __dirname + '/../../../../Contexts/**/*Repository.ts';
    const files = this.loadFilesMatching(dir);
    console.debug(` - Discovered ${files.length} repository files`);
  }

  static loadFilesMatching(path: string): Array<string> {
    const files = glob.sync(path);
    files.map(require);
    return files;
  }
}
