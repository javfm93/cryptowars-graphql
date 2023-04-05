import { Towns } from '@/contexts/cryptoWars/application/towns/towns';
import { TownRepository } from '@/contexts/cryptoWars/domain/TownRepository';
import { container } from '@/contexts/shared/infrastructure/container';

const repository = container.get(TownRepository);

export default function HomePage() {
  return <Towns repository={repository} />;
}

// export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
//   const authCookie = getCookie('connect.sid', { req, res });
//   const repository = container.get(PlayerRepository);
//   await repository.home();

//   return {
//     props: { repository },
//     revalidate: 1,
//     ...getApolloState(container.get(ApolloClient))
//   };
// };
