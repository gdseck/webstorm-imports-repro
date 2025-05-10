import Button from './Button.vue'

export { Button }
export default Button

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  label?: string
}