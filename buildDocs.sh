#!/usr/bin/env bash
# Clean up previous build
rm -rf ./dist

# Link dependencies correctly.
yarn run link

# Build core (dependency)
yarn run build-core || { echo '@canvas-panel/core failed to build' ; exit 1; }

# Link dependencies after building.
yarn run link

# Build plugin (dependency of cookbook)
yarn run build-patchwork-plugin || { echo '@canvas-panel/patchwork-plugin failed to build' ; exit 1; }

# Link dependencies after building
yarn run link

# Build cookbook example site (base)
yarn run build-cookbook || { echo 'Cookbook failed to build' ; exit 1; }
mv ./packages/canvas-panel-cookbook/dist .

# Build documentation
yarn run build-docs || { echo 'Styleguide failed to build' ; exit 1; }
mv ./packages/canvas-panel-core/styleguide ./dist

# Temporary: Build Galway viewer
yarn run build-galway || { echo 'Galway failed to build' ; exit 1; }
mv ./packages/galway-viewer/dist ./packages/galway-viewer/galway
mv ./packages/galway-viewer/galway ./dist/galway
