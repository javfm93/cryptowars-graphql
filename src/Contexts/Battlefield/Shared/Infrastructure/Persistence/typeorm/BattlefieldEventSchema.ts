import { EntitySchema } from 'typeorm';
import { BattlefieldInternalEventPrimitives } from '../../../Domain/BattlefieldInternalEvent';

export const BattlefieldEventSchema: EntitySchema<BattlefieldInternalEventPrimitives> =
  new EntitySchema<BattlefieldInternalEventPrimitives>({
    name: 'BattlefieldEvents',
    tableName: 'battlefieldEvents',
    columns: {
      id: {
        type: String,
        primary: true
      },
      aggregateId: {
        type: String
      },
      version: {
        type: Number
      },
      eventName: {
        type: String
      },
      data: {
        type: 'simple-json'
      }
    },
    uniques: [
      {
        columns: ['aggregateId', 'version']
      }
    ]
  });
