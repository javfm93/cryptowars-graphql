import { Login } from '@/contexts/IAM/users/application/login/login'
import { UserRepository } from '@/contexts/IAM/users/domain/userRepository'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(UserRepository)

export default function LoginPage() {
  return <Login repository={repository} />
}
