import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Town } from '../../../../apps/CryptoWars/backend/Resolvers/CryptoWars/Towns/GetPlayerTownResponse';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Towns } from '../../Towns/Domain/Towns';
import { TownSchema } from '../../Towns/Infrastructure/TownSchema';
import { Worlds } from '../../Worlds/Domain/Worlds';
import { WorldSchema } from '../../Worlds/Infrastructure/Persistence/WorldSchema';

@ObjectType('Player')
@Entity('players')
export class PlayerSchema {
  @Field(type => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  userId!: string;

  @Field(type => [Town])
  @OneToMany(() => TownSchema, t => t.player, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  towns!: Primitives<Towns>;

  @Field(type => [WorldSchema])
  @ManyToMany(() => WorldSchema, w => w.players, { cascade: ['insert', 'update'] })
  worlds!: Primitives<Worlds>;
}
