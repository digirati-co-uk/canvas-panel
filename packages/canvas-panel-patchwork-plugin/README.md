# canvas-panel-patchwork-plugin

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe canvas-panel-patchwork-plugin here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Note about UMD builds and bundle size

Without Manifesto, OpenSeadragon or React

```
  umd/canvas-panel-patchwork-plugin.js      66.26 KB
  umd/canvas-panel-patchwork-plugin.min.js  27.48 KB
```

With OpenSeadragon + React + Manifesto

```
  umd/canvas-panel-patchwork-plugin.js      428.43 KB
  umd/canvas-panel-patchwork-plugin.min.js  145.3 KB
```

With just React

```
  umd/canvas-panel-patchwork-plugin.js      205.37 KB
  umd/canvas-panel-patchwork-plugin.min.js  58.21 KB
```

With just Manifesto

```
  umd/canvas-panel-patchwork-plugin.js      146.67 KB
  umd/canvas-panel-patchwork-plugin.min.js  64.2 KB
```

With just OpenSeadragon

```
  umd/canvas-panel-patchwork-plugin.js      208.93 KB
  umd/canvas-panel-patchwork-plugin.min.js  78.68 KB
```

With React + Manifesto

```
  umd/canvas-panel-patchwork-plugin.js      286.22 KB
  umd/canvas-panel-patchwork-plugin.min.js  94.55 KB
```

With OpenSeadragon + Manifesto

```
  umd/canvas-panel-patchwork-plugin.js      428.62 KB
  umd/canvas-panel-patchwork-plugin.min.js  145.41 KB
```

With React + OpenSeadragon

```
  umd/canvas-panel-patchwork-plugin.js      146.55 KB
  umd/canvas-panel-patchwork-plugin.min.js  64.18 KB
```

Current CDN Links:

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/2.3.1/openseadragon.min.js"></script>
<script crossorigin src="https://cdn.rawgit.com/stephenwf/manifesto/feature/p3-alpha/dist/client/manifesto.js"></script>
```

You can configure the build in the `nwb.config.js` if you want to fine tune whats included, and what gets loaded from a CDN.
