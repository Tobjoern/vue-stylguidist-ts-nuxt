// This is Nuxt configuration file
// See: https://nuxtjs.org/guide/configuration/

import { Configuration } from '@nuxt/types'
import { resolve } from 'path'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

import pkg from './package.json'

const ROOT_DIR: Configuration['rootDir'] = resolve(__dirname)
const SRC_DIR: Configuration['srcDir'] = 'client'
const SCSS_DIR = resolve(ROOT_DIR, SRC_DIR, 'scss')
import * as path from 'path'
import * as fs from 'fs'

const nuxtConfig: Configuration = {
  // for some reason does the generate.dir determine the build directory, and not the buildDir.
  generate: {
    concurrency: 1000
  },

  /**
   * The Mode used.
   */
  ssr: false,

  /**
   * Headers of the page.
   */
  'head': {
    'htmlAttrs': { 'lang': 'en' },
    'title': pkg.name,
    'meta': [
      { 'charset': 'utf-8' },
      { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
      {
        'hid': 'description',
        'name': 'description',
        'content': pkg.description,
      },
    ],
    'link': [
      {
        'rel': 'icon',
        'type': 'image/x-icon',
        'href': '/favicon.ico',
      }, {
        'rel': 'icon',
        'type': 'image/png',
        'sizes': '32x32',
        'href': '/favicon-32x32.png',
      }, {
        'rel': 'icon',
        'type': 'image/png',
        'sizes': '96x96',
        'href': '/favicon-96x96.png',
      },
    ],
    script: [
    ]
  },

  // Disable .nuxt-progress bar, as it's annoying
  loading: false,

  /**
   * Specify Nuxt source directory.
   */
  'srcDir': SRC_DIR,
  'rootDir': ROOT_DIR,

  /**
   * Modules that are used in build-time only.
   */
  'buildModules': [
    ['@nuxt/typescript-build', {
      'typeCheck': true,
    }],
  ],

  /**
   * Extra Nuxt modules.
   */
  'modules': [
    '@nuxtjs/axios',
    'nuxt-imagemin',
    '@nuxtjs/style-resources'
  ],

  /**
   * Axios settings.
   */
  'axios': {
    // See https://axios.nuxtjs.org/options.html
    'debug': true,
    'https': true,
    'proxyHeadersIgnore': ['accept', 'accept-encoding', 'host'],
    'progress': true,
    'proxy': false,
    'retry': false,

    // Probably not needed anymore!
    // 'httpsAgent': {
    //   'rejectUnauthorized': !Env.isDev
    // },
    credentials: true
  },

  /**
   * Custom plugins.
   */
  'plugins': [
    {
      src: '~/plugins/notification',
      ssr: false
    },
    '~/plugins/main',
    // Install TypeDI to inject dependencies:
    '~/plugins/type-di',
    '~/plugins/axios'
  ],

  components: false,

  /**
   * Global CSS.
   */
  'css': [
    'normalize.css/normalize.css'
  ],

  /**
   * Postcss configuration.
   */
  'postcss': {},

  'styleResources': {
    'scss': [
      path.resolve(__dirname, './client/scss/index.scss'),
    ]
  },

  /**
   * Build configuration.
   */
  'build': {
    loaders: {
      scss: {
        // this is so that changing a class css value
        // via the chrome devtools doesn't screw up the styling
        sourceMap: true
      }
    },

    cache: true,
    // hardSource: true,
    // parallel: true,
    // eslint-disable-next-line complexity
    extend(config, { isDev, isClient }): void {
      if (config.resolve && config.resolve.alias) {
        // This line allows us to use `@import "~/scss/..."` in our app:
        config.resolve.alias['/scss'] = SCSS_DIR
      }

      if (isDev && isClient && config.module) {
        // Enabling eslint:
        config.module.rules.push({
          'enforce': 'pre',
          'test': /\.(js|ts|vue)$/u,
          'loader': 'eslint-loader',
          'exclude': /(node_modules)/u
        })

        if (config.plugins) {
          // Enabling stylelint:
          config.plugins.push(new StylelintWebpackPlugin({
            'files': 'client/**/*.{vue,scss,css}',
          }))
        }
      }

      if (isDev) {
        config.devtool = 'source-map'
      }
    },
  },
}

export default nuxtConfig
