import { Registration } from '@/contexts/IAM/users/application/registration/registration'
import { UserRepository } from '@/contexts/IAM/users/domain/userRepository'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(UserRepository)

export default function RegistrationPage() {
  return <Registration repository={repository} />
}
