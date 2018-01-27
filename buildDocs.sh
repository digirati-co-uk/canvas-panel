#!/usr/bin/env bash
# Clean up previous build
rm -rf ./dist

# Link dependencies correctly.
yarn run link

# Build core (dependency)
yarn run build-core

# Build cookbook example site (base)
yarn run build-cookbook
mv ./packages/canvas-panel-cookbook/dist .

# Build documentation
yarn run build-docs
mv ./packages/canvas-panel-core/styleguide ./dist
