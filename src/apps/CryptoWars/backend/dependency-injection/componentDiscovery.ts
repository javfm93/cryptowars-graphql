import glob from 'glob';

export class ComponentDiscovery {
  constructor() {}

  static scan() {
    this.scanControllers();
    this.scanCommandHandlers();
    this.scanRepositories();
    return this;
  }

  static scanControllers() {
    const dir = __dirname + '/../Controllers/**/*Controller.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`loaded ${files.length} controller files`);
  }

  static scanCommandHandlers() {
    const dir = __dirname + '/../../../../Contexts/**/*CommandHandler.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`loaded ${files.length} command handlers files`);
  }

  static scanRepositories() {
    const dir = __dirname + '/../../../../Contexts/**/*Repository.*';
    const files = this.loadFilesMatching(dir);
    console.debug(`loaded ${files.length} repository files`);
  }

  static loadFilesMatching(path: string): Array<string> {
    const files = glob.sync(path);
    files.map(require);
    return files;
  }
}
