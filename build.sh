#!/usr/bin/env bash
npm install
npx tsc
npx babel ./src/render.js --out-file index.js --presets=@babel/preset-env --no-comments
npx babel index.js --out-file index.min.js --presets minify
