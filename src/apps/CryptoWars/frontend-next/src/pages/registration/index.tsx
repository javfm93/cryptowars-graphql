import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { Registration } from '@/contexts/IAM/users/application/registration/registration'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(UserRepository)

export default function RegistrationPage() {
  return <Registration repository={repository} />
}
