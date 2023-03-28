import {
  Column,
  Entity,
  EntitySchema,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { WorldPrimitives } from '../../Domain/World';
import { Field, ID, ObjectType } from 'type-graphql';
import { TownSchema } from '../../../Towns/Infrastructure/TownSchema';
import { PlayerSchema } from '../../../Players/Infrastructure/PlayerSchema';

@ObjectType('World')
@Entity('worlds')
export class WorldSchema {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => PlayerSchema, p => p.worlds, { cascade: ['insert', 'update'] })
  @JoinTable()
  players!: Array<PlayerSchema>;

  @OneToMany(() => TownSchema, t => t.world, {
    cascade: ['insert', 'update']
  })
  towns!: Array<TownSchema>;
}

export const WorldSchema2 = new EntitySchema<WorldPrimitives>({
  name: 'World',
  tableName: 'worlds',
  columns: {
    id: {
      type: String,
      primary: true
    },
    name: {
      type: String,
      unique: true
    }
  },
  relations: {
    players: {
      type: 'many-to-many',
      target: 'Player',
      cascade: ['insert', 'update'],
      joinTable: true
    },
    towns: {
      type: 'many-to-many',
      target: 'Town',
      cascade: ['insert', 'update'],
      joinTable: true
    }
  }
});
