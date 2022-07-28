#!/usr/bin/env bash
yarn install
npx babel render.js --out-file index.js --plugins @babel/plugin-transform-modules-commonjs --no-comments
npx babel index.js --out-file index.min.js --presets minify
