import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { TownSoldiersPrimitives } from './TownSoldiers';

type TownSoldierTrainFinishedBody = {
  readonly eventName: string;
  readonly id: string;
  readonly soldiers: TownSoldiersPrimitives;
};

export class TownSoldiersTrainFinished extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.soldierTrainFinished';
  readonly soldiers: TownSoldiersPrimitives;

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
    super(TownSoldiersTrainFinished.EVENT_NAME, id, eventId, occurredOn);
    this.soldiers = soldiers;
  }

  toPrimitive(): TownSoldierTrainFinishedBody {
    const { aggregateId } = this;
    return {
      eventName: TownSoldiersTrainFinished.EVENT_NAME,
      id: aggregateId,
      soldiers: this.soldiers
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: TownSoldierTrainFinishedBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new TownSoldiersTrainFinished({
      id: aggregateId,
      eventId,
      occurredOn,
      soldiers: body.soldiers
    });
  }
}
