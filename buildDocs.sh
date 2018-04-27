#!/usr/bin/env bash
# Clean up previous build
rm -rf ./dist

# Build everything.
yarn run build || { echo '@canvas-panel failed to build' ; exit 1; }

# Build cookbook example site (base)
yarn run build-cookbook || { echo 'Cookbook failed to build' ; exit 1; }
mv ./packages/canvas-panel-cookbook/dist .

# Build documentation
yarn run build-docs || { echo 'Styleguide failed to build' ; exit 1; }
mv ./packages/canvas-panel-core/styleguide ./dist

# Temporary: Build Galway viewer

# Build plugin (dependency of galway)
yarn run build-redux || { echo '@canvas-panel/redux failed to build' ; exit 1; }

# Link dependencies after building
yarn run link

# Build plugin (dependency of galway)
yarn run build-timeline || { echo '@canvas-panel/timeline failed to build' ; exit 1; }

# Link dependencies after building
yarn run link

yarn run build-galway || { echo 'Galway failed to build' ; exit 1; }
mv ./packages/galway-viewer/dist ./packages/galway-viewer/galway
mv ./packages/galway-viewer/galway ./dist/galway

yarn run build-pmc || { echo 'PMC failed to build' ; exit 1; }
mv ./packages/pmc-viewer/demo/dist ./packages/pmc-viewer/demo/pmc
mv ./packages/pmc-viewer/demo/pmc ./dist/pmc
