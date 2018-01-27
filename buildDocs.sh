#!/usr/bin/env bash
# Clean up previous build
rm -rf ./dist

# Link dependencies correctly.
npm run link

# Build cookbook example site (base)
npm run build-cookbook
mv ./packages/canvas-panel-cookbook/dist .

# Build documentation
npm run build-docs
mv ./packages/canvas-panel-core/styleguide ./dist
