import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class InMemoryEnvironmentArranger extends EnvironmentArranger {
  constructor() {
    super();
  }

  public async arrange(): Promise<void> {}

  public async close(): Promise<void> {}
}
