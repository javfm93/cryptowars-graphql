import { EntitySchema } from 'typeorm';
import { Primitives } from '../../../../../Shared/Domain/Primitives';
import { Task } from '../../../Domain/Task';

export const TaskSchema = new EntitySchema<Primitives<Task>>({
  name: 'TaskSchedule',
  tableName: 'TaskSchedule',
  indices: [
    {
      unique: true,
      columns: ['triggerAt', 'id']
    }
  ],
  uniques: [
    {
      columns: ['triggerAt', 'id']
    }
  ],
  columns: {
    triggerAt: {
      type: Number,
      primary: true
    },
    id: {
      type: String,
      primary: true
    },
    eventToTrigger: {
      type: 'simple-json',
      nullable: false
    },
    createdAt: {
      type: 'datetime',
      nullable: false
    },
    status: {
      type: String,
      nullable: false
    }
  }
});
