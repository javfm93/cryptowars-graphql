import { Column, Entity, EntitySchema, PrimaryColumn } from 'typeorm';
import { Army } from '../../Domain/Army';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Field, ID, ObjectType } from 'type-graphql';
import { SquadTypes } from '../../Domain/Squads';

@ObjectType()
export class Squads {
  @Field()
  [SquadTypes.basic]!: number;

  @Field()
  [SquadTypes.range]!: number;
}

@ObjectType('Army')
@Entity('armies')
export class ArmySchema {
  @Field(type => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  playerId!: string;

  @Field()
  @Column({ unique: true })
  townId!: string;

  @Field(type => Squads)
  @Column({ type: 'simple-json' })
  squads!: Squads;
}

export const ArmySchema2: EntitySchema<Primitives<Army>> = new EntitySchema<Primitives<Army>>({
  name: 'Army',
  tableName: 'armies',
  columns: {
    id: {
      type: String,
      primary: true
    },
    townId: {
      type: String,
      unique: true
    },
    playerId: {
      type: String,
      unique: true
    },
    squads: {
      type: 'simple-json'
    }
  }
});
