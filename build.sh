#!/usr/bin/env bash
yarn install
npx babel render.js --out-file index.js --plugins @babel/plugin-transform-modules-commonjs
