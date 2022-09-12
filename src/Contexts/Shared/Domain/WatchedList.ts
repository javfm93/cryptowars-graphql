export abstract class WatchedList<Entity, EntityPrimitives> {
  public currentItems: Entity[];
  private initial: Entity[];
  private new: Entity[];
  private removed: Entity[];

  constructor(initialItems?: Entity[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.initial = initialItems ? initialItems : [];
    this.new = [];
    this.removed = [];
  }

  abstract compareItems(a: Entity, b: Entity): boolean;
  abstract compareItems(a: Entity, b: Entity): boolean;
  public getItems(): Entity[] {
    return this.currentItems;
  }

  public getNewItems(): Entity[] {
    return this.new;
  }

  public getRemovedItems(): Entity[] {
    return this.removed;
  }

  private isCurrentItem(item: Entity): boolean {
    return this.currentItems.filter((v: Entity) => this.compareItems(item, v)).length !== 0;
  }

  private isNewItem(item: Entity): boolean {
    return this.new.filter((v: Entity) => this.compareItems(item, v)).length !== 0;
  }

  private isRemovedItem(item: Entity): boolean {
    return this.removed.filter((v: Entity) => this.compareItems(item, v)).length !== 0;
  }

  private removeFromNew(item: Entity): void {
    this.new = this.new.filter(v => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: Entity): void {
    this.currentItems = this.currentItems.filter(v => !this.compareItems(item, v));
  }

  private removeFromRemoved(item: Entity): void {
    this.removed = this.removed.filter(v => !this.compareItems(item, v));
  }

  private wasAddedInitially(item: Entity): boolean {
    return this.initial.filter((v: Entity) => this.compareItems(item, v)).length !== 0;
  }

  public exists(item: Entity): boolean {
    return this.isCurrentItem(item);
  }

  public add(item: Entity): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  public remove(item: Entity): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }
}
