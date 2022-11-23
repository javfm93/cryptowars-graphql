import { Uuid } from './value-object/Uuid';

const isEntity = (v: any): v is Entity => v instanceof Entity;

export abstract class Entity {
  readonly id: Uuid;

  protected constructor(id: Uuid) {
    this.id = id;
  }

  public isEqualTo(object?: Entity): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id.isEqualTo(object.id);
  }
}
