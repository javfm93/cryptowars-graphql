import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { PlayerSchema } from '../../../Players/Infrastructure/PlayerSchema';
import { TownSchema } from '../../../Towns/Infrastructure/TownSchema';

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
