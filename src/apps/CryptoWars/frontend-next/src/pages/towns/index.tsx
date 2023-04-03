/* eslint-disable react-hooks/rules-of-hooks */
import { Towns, playerTownsFragment } from '@/contexts/cryptoWars/application/home/towns';
import { PlayerRepository } from '@/contexts/cryptoWars/domain/playerRepository';
import { useFragment } from '@/contexts/shared/domain/__generated__';
import { container } from '@/contexts/shared/infrastructure/container';
import { InferGetStaticPropsType } from 'next';

export default function HomePage({ player }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (player.isFailure()) {
    return <p>An error happen</p>;
  }
  const towns = useFragment(playerTownsFragment, player.value.towns);

  return <Towns towns={towns} />;
}

export async function getStaticProps() {
  const repository = container.get(PlayerRepository);
  const player = await repository.home();

  return {
    props: {
      player
    },
    revalidate: 10
  };
}
