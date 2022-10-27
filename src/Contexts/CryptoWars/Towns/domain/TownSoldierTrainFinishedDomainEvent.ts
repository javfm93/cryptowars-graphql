import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';

type TownSoldierTrainFinishedBody = {
  readonly eventName: string;
  readonly id: string;
  readonly soldier: TownSoldiersPrimitives;
};

export class TownSoldierTrainFinished extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.soldierTrainFinished';
  readonly soldier: TownSoldiersPrimitives;

  constructor({
    id,
    soldiers,
    eventId,
    occurredOn
  }: {
    id: string;
    soldiers: TownSoldiersPrimitives;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super(TownSoldierTrainFinished.EVENT_NAME, id, eventId, occurredOn);
    this.soldier = soldiers;
  }

  toPrimitive(): TownSoldierTrainFinishedBody {
    const { aggregateId } = this;
    return {
      eventName: TownSoldierTrainFinished.EVENT_NAME,
      id: aggregateId,
      soldier: this.soldier
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: TownSoldierTrainFinishedBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new TownSoldierTrainFinished({
      id: aggregateId,
      eventId,
      occurredOn,
      soldiers: body.soldier
    });
  }
}
