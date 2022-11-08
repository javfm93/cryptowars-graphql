import { EntitySchema } from 'typeorm';
import { BattlefieldEventPrimitives } from '../../../Domain/BattlefieldEvent';

export const BattlefieldEventSchema: EntitySchema<BattlefieldEventPrimitives> =
  new EntitySchema<BattlefieldEventPrimitives>({
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
