import { Login } from '@/contexts/IAM/application/login/login'
import { UserRepository } from '@/contexts/IAM/domain/userRepository'
import { container } from '@/contexts/shared/infrastructure/container'

const repository = container.get(UserRepository)

export default function LoginPage() {
  return <Login repository={repository} />
}
