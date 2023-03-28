import { Column, Entity, EntitySchema, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { PlayerPrimitives } from '../Domain/Player';
import { Field, ID, ObjectType } from 'type-graphql';
import { TownSchema } from '../../Towns/Infrastructure/TownSchema';
import { WorldSchema } from '../../Worlds/Infrastructure/Persistence/WorldSchema';
import { TownPrimitives } from '../../Towns/Domain/Town';
import { WorldPrimitives } from '../../Worlds/Domain/World';

@ObjectType('Player')
@Entity('players')
export class PlayerSchema {
  @Field(type => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  userId!: string;

  @Field(type => [TownSchema])
  @OneToMany(() => TownSchema, t => t.player, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  towns!: Array<TownPrimitives>;

  @Field(type => [WorldSchema])
  @ManyToMany(() => WorldSchema, w => w.players, { cascade: ['insert', 'update'] })
  worlds!: Array<WorldPrimitives>;
}

export const PlayerSchema2: EntitySchema<PlayerPrimitives> = new EntitySchema<PlayerPrimitives>({
  name: 'Player',
  tableName: 'players',
  columns: {
    id: {
      type: String,
      primary: true
    },
    userId: {
      type: String,
      unique: true
    }
  },
  relations: {
    towns: {
      type: 'one-to-many',
      target: 'Town',
      onDelete: 'SET NULL',
      cascade: ['insert', 'update'],
      inverseSide: 'player'
    },
    worlds: {
      type: 'many-to-many',
      target: 'World',
      cascade: ['insert', 'update'],
      joinTable: { name: 'worlds_players_players' }
    }
  }
});
