import Card from './Card.vue'

export { Card }
export default Card

export type CardProps = {
  title?: string
  bordered?: boolean
  maxTitleLength?: number
}