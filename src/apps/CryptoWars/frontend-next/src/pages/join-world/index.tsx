import { Worlds } from '@/contexts/cryptoWars/application/joinWorld/Worlds'
import { WorldRepository } from '@/contexts/cryptoWars/domain/WorldRepository'
import { Layout } from '@/contexts/shared/application/Layout'
import { container } from '@/contexts/shared/infrastructure/container'
import { useTranslation } from 'react-i18next'

const repository = container.get(WorldRepository)

export default function JoinWorldPage() {
  const { t } = useTranslation()

  return (
    <Layout tittle={t('home.startPlaying')}>
      <Worlds repository={repository} />
    </Layout>
  )
}
