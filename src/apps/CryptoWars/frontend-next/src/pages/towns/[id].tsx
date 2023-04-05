import { Town } from '@/contexts/cryptoWars/application/towns/town';
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository';
import { container } from '@/contexts/shared/infrastructure/container';
import { useRouter } from 'next/router';

const repository = container.get(TownRepository);

export default function TownPage() {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== 'string') return <p>Not valid id</p>;

  return <Town repository={repository} id={id} />;
}
