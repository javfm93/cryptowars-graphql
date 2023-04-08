import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { Login } from '@/contexts/IAM/users/application/login/login'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(UserRepository)

export default function LoginPage() {
  return <Login repository={repository} />
}
