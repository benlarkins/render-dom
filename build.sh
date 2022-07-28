#!/usr/bin/env bash
yarn install
npx babel render.js --out-file index.js --presets=@babel/preset-env --no-comments
npx babel index.js --out-file index.min.js --presets minify
