// Configuration for EsLint
// See: https://eslint.org/docs/user-guide/configuring

module.exports = {
  'root': true,

  'extends': [
    // '@wemake-services/javascript',
    '@wemake-services/typescript/recommended',
    '@wemake-services/vue',
    '@wemake-services/jsdoc',
    'plugin:nuxt/recommended',
    '@vue/typescript',
    'plugin:compat/recommended',
    'plugin:vue-a11y/recommended',
  ],
  'plugins': [
    'compat',
    'json',
    'eslint-plugin-import-helpers',
  ],
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
  },
  'settings': {
    // providing polyfills for `eslint-plugin-compat` plugin, see:
    // https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills
    'polyfills': [],
  },
  'rules': {
    // // Sets the import order linting,
    // // see: https://github.com/Tibfib/eslint-plugin-import-helpers
    // 'import-helpers/order-imports': ['error', {
    //   'newlinesBetween': 'always',
    //   'groups': ['module', '/^~//', '/^@//'],
    //   'alphabetize': { 'order': 'asc', 'ignoreCase': false },
    // }],
    'vue/singleline-html-element-content-newline': false,
    'vue/html-self-closing': false,
    'vue/max-attributes-per-line': false,
    'vue/attributes-order': false,
    'vue/use-v-on-exact': false,
    'vue/valid-template-root': false,
    '@typescript-eslint/semi': false,
    'max-len': 0,
    'comma-dangle': 0,
    'quote-props': 0,
    'space-before-function-paren': 0,
    'id-length': 0,
    'no-console': 0,
    'no-extra-parens': 0,
    'radix': 0,
    'no-delete-var': 0,
    'default-case': 0,
    'no-magic-numbers': 0,
    'array-bracket-newline': 0,
    'eol-last': 0,
    'id-blacklist': 0,
    'multiline-ternary': 0,
    'no-negated-condition': 0,
    'no-plusplus': 0,
    'no-ternary': 0,
    'vue/multiline-html-element-content-newline': 0,
    'unicorn/filename-case': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    'import-helpers/order-imports': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 0,
    'vue/attribute-hyphenation': 0,
    'vue/valid-v-bind': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'vue/no-v-html': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'vue-a11y/click-events-have-key-events': 1,
    'vue-a11y/form-has-label': 1,
    '@typescript-eslint/no-extra-parens': 0,
    'vue/html-indent': 0,
    'vue-a11y/alt-text': 0,
    '@typescript-eslint/camelcase': 0,
    'vue-a11y/media-has-caption': 0,
    'vue-a11y/label-has-for': 0,
    'vue-a11y/mouse-events-have-key-events': 0,
    '@typescript-eslint/generic-type-naming': 0,
    '@typescript-eslint/no-var-requires': 0
    // 'a11y/content-property-no-static-value': 0,
    // 'selector-pseudo-element-colon-notation': 0
    // no-trailing-spaces
  },
  'env': {
    'node': true,
    'browser': true,
  },
  // 'overrides': [{
  //   // Pages and layouts should have kebab case due to Nuxt's API:
  //   'files': ['client/pages/**/*.vue', 'client/layouts/**/*.vue'],
  //   'rules': {
  //     'unicorn/filename-case': ['error', { 'case': 'kebabCase' }],
  //   },
  // }],
}
