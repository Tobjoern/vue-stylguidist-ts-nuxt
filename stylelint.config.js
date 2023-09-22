// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
  'extends': [
    '@wemake-services/stylelint-config-scss',
    'stylelint-config-css-modules',
    'stylelint-a11y/recommended',
  ],
  'plugins': [
    'stylelint-a11y',
  ],

  'rules': {
    // ignore special `var-` css variables for `:export`
    'property-no-unknown': [
      true, {
        'ignoreProperties': ['/^var-/'],
      },
    ],

    // fixes for Vue single file components:
    'no-empty-source': null,
    'at-rule-no-unknown': null,


    // a11y
    'a11y/content-property-no-static-value': true,
    'scale-unlimited/declaration-strict-value': null,
    'length-zero-no-unit': null,
    'color-format/format': null,
    'a11y/selector-pseudo-class-focus': null,
    'comment-whitespace-inside': null,
    'string-quotes': null,
    'color-named': null,
    'plugin/selector-tag-no-without-class': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'rule-empty-line-before': null,
    'number-leading-zero': null,
    'function-comma-space-after': null,
    'declaration-block-trailing-semicolon': null,
    'block-no-empty': null,
    'plugin/stylelint-no-indistinguishable-colors': null,
    'scss/dollar-variable-pattern': null,
    'selector-max-compound-selectors': null,
    'plugin/no-low-performance-animation-properties': null,
    'a11y/media-prefers-reduced-motion': null,
    'max-line-length': null,
    'max-nesting-depth': null,
    'csstools/use-nesting': null,
    'declaration-colon-newline-after': null
  },
  'ignoreFiles': [
    'client/assets/**',
    'client/modules/**',
    'client/static/**'
  ]
}
