import glob from 'glob';

export class ComponentDiscovery {
  constructor() {}

  static scan() {
    this.scanControllers();
    this.scanCommandHandlers();
    this.scanQueryHandlers();
    this.scanDomainEventHandlers();
    this.scanRepositories();
    return this;
  }

  static scanControllers() {
    const dir = __dirname + '/../Controllers/**/*Controller.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`Scanned ${files.length} controller files`);
  }

  static scanCommandHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*CommandHandler.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`Scanned ${files.length} command handlers files`);
  }

  static scanQueryHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*QueryHandler.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`Scanned ${files.length} query handlers files`);
  }

  static scanDomainEventHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*On*.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`Scanned ${files.length} domain event handlers files`);
  }

  static scanRepositories() {
    const dir = __dirname + '/../../../../Contexts/**/*Repository.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`Scanned ${files.length} repository files`);
  }

  static loadFilesMatching(path: string): Array<string> {
    const files = glob.sync(path);
    files.map(require);
    return files;
  }
}
