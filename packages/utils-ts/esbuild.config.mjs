#!/usr/bin/env node
import * as esbuild from 'esbuild'
import unpluginIsolatedDeclPlugin from 'unplugin-isolated-decl/esbuild'

await esbuild.build({
  entryPoints: ['lib/**'],
  outdir: 'dist',
  logLevel: 'info',
  tsconfig: 'tsconfig.build.json',
  plugins: [
    unpluginIsolatedDeclPlugin({
      transformer: 'oxc'
    })
  ]
})