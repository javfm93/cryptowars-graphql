import { SendAttackRequest } from '../../../../../../backend/Controllers/Battlefield/Attacks/SendAttackRequest'

export const useSendAttack = () => {
  const sendAttack = (attack: SendAttackRequest) => () => {
    console.log('attack sent!')
  }
  return { sendAttack }
}
