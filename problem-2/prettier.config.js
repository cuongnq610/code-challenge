export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',

  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^@?\\w', '^[./]'],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSortImports: true,
};
