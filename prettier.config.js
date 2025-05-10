// /** @type {import('prettier').Config} */
export default {
  arrowParens: 'avoid',
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  semi: false,
  endOfLine: 'lf',
  sortingMethod: 'alphabetical',
  importTypeOrder: ['NPMPackages', 'localImportsValue', 'localImportsType'],
  newlineBetweenTypes: true,
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-multiline-arrays',
    'prettier-plugin-sort-imports'
  ]
}
