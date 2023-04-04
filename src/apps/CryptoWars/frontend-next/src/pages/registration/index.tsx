import { Registration } from '@/contexts/IAM/application/registration/registration';
import { UserRepository } from '@/contexts/IAM/domain/userRepository';
import { container } from '@/contexts/shared/infrastructure/container';

const repository = container.get(UserRepository);

export default function RegistrationPage() {
  return <Registration repository={repository} />;
}
