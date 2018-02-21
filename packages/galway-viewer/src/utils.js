if (!Element.prototype.matches)
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function(s) {
    let el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };

export function computeStyleFromItem(visibility, item) {
  if (visibility === RANGE_DISPLAY_NONE) {
    return { flex: 0.0001, flexBasis: '0px', transform: 'translateX(3px)' };
  }
  if (visibility === RANGE_DISPLAY_PREV_NEXT) {
    return { flex: '0 0 80px', transform: 'initial' };
  }
  if (visibility === RANGE_DISPLAY_LARGE && item) {
    return {
      flex: item.range[1] - item.range[0],
      flexBasis: '0px',
      transform: 'initial',
    };
  }
  return {};
}

export const TEMPORAL = 'dcterms:temporal';

export function dropCaseComparison(a, b) {
  return (a ? a : '').toLowerCase() === (b ? b : '').toLowerCase();
}

export class EventBus {
  constructor(name) {
    this.name = name;
    this.events = {};
  }

  subscribe(event, func) {
    this.events[event] = this.events[event] ? this.events[event] : [];
    this.events[event].push(func);
    return this;
  }

  dispatch(event, ...params) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach(ev => ev(...params));
  }

  listenFor(event, bus) {
    bus.subscribe(event, (...params) => this.dispatch(event, ...params));
  }
}

export function mapAnnotation(annotation) {
  const linkToManifest = {
    xywh: null,
    url: null,
    canvasId: null,
    label: null,
    description: null,
  };
  if (dropCaseComparison(annotation.motivation, 'oa:linking')) {
    const parts = annotation.on.split('#');
    linkToManifest.xywh = parts.length > 1 ? parts[1] : null;
    // will populate this object:
    if (annotation.resource['@type'] === 'sc:Manifest') {
      linkToManifest.url = annotation.resource['@id'];
      linkToManifest.label = annotation.resource.label;
      linkToManifest.description = annotation.resource.description;
    } else if (dropCaseComparison(annotation.resource['@type'], 'sc:Canvas')) {
      // we MUST be given a within otherwise we're stuffed
      if (
        annotation.resource.within &&
        dropCaseComparison(annotation.resource.within['@type'], 'sc:Manifest')
      ) {
        linkToManifest.url = annotation.resource.within['@id'];
        linkToManifest.label = annotation.resource.within.label;
        linkToManifest.description = annotation.resource.within.description;
        linkToManifest.canvasId = annotation.resource['@id'];
      }
    }
  }
  if (!linkToManifest.url) {
    return null;
  }
  return linkToManifest;
}

export function setStyle($el, style) {
  if (style) {
    Object.keys(style)
      .map(key => ({ key, value: style[key] }))
      .forEach(styleAttr => ($el.style[styleAttr.key] = styleAttr.value));
  }
  return $el;
}

export function createMap(acc, range) {
  acc[range['@id']] = range;
  return acc;
}

export function findTopLevel(found, range) {
  if (!found && range.viewingHint === 'top') {
    return range;
  }
  return found;
}

export function expander(mapped) {
  return item => mapped[item['@id']];
}

export function enhancedStructure(expand, canvasNumMap) {
  return input => {
    const range = expand(input);
    if (range.members) {
      range.canvases = range.members
        .filter(member => member['@type'] === 'sc:Canvas')
        .map(member => member['@id']);
      range.members = range.members
        .filter(member => member['@type'] === 'sc:Range')
        .map(enhancedStructure(expand, canvasNumMap));
    }
    // console.log(canvasToNumber);
    range.canvasNumbers = range.canvases.map(i => canvasNumMap[i]);
    range.range =
      range.canvasNumbers.length === 1
        ? range.canvasNumbers[0]
        : [Math.min(...range.canvasNumbers), Math.max(...range.canvasNumbers)];
    range.temporal = range['dcterms:temporal']
      .split('/')
      .map(date => parseInt(date.slice(0, 4)));

    const structure = {
      id: range['@id'],
      label: range.label,
      temporal: range.temporal,
      range: range.range,
    };
    if (range.members) {
      structure.children = range.members;
    }
    return structure;
  };
}

export function createStructure(topLevel, mapped, canvasNumMap) {
  const expand = expander(mapped);
  return topLevel.members.map(enhancedStructure(expand, canvasNumMap));
}

export function DOM(
  tagName,
  { className, onClick, style, attributes, onMouseEnter, onMouseLeave } = {},
  children
) {
  const $el = document.createElement(tagName);
  if (className) {
    if (Array.isArray(className)) {
      className.forEach(c => $el.classList.add(c));
    } else {
      $el.classList.add(className);
    }
  }
  if (onClick) {
    $el.addEventListener('click', onClick);
  }
  if (onMouseEnter) {
    $el.addEventListener('mouseenter', onMouseEnter);
  }
  if (onMouseLeave) {
    $el.addEventListener('mouseleave', onMouseLeave);
  }
  if (attributes) {
    Object.keys(attributes)
      .map(key => ({ key, value: attributes[key] }))
      .forEach(attr => $el.setAttribute(attr.key, attr.value));
  }

  setStyle($el, style);

  if (children) {
    if (Array.isArray(children)) {
      children
        .filter(e => e)
        .forEach($child =>
          $el.appendChild(
            typeof $child === 'string'
              ? document.createTextNode($child)
              : $child
          )
        );
    }
    if (typeof children === 'string') {
      $el.innerText = children;
    }
  }
  return $el;
}

export function https(url) {
  if (url.substr(0, 5) !== 'http:') {
    return url;
  }
  return `https${url.substr(4)}`;
}

export function img(src, { forceHttps, id, onLoad = null, className }) {
  const image = document.createElement('img');
  if (id) {
    image.id = id;
  }
  if (onLoad) {
    image.addEventListener('load', e => onLoad(img));
  }
  if (className) {
    image.classList.add(className);
  }
  image.src = forceHttps ? https(src) : src;
  return image;
}

export function link(href, text, onClick) {
  const aTag = document.createElement('a');
  aTag.href = href;
  aTag.innerHTML = text;
  aTag.addEventListener('click', e => {
    onClick(href, e);
  });
  return aTag;
}

export function paragraph(children, className) {
  const p = document.createElement('p');
  children.map($child =>
    p.appendChild(
      typeof $child === 'string' ? document.createTextNode($child) : $child
    )
  );
  if (className) {
    p.className = className;
  }
  return p;
}

export function div(props, children) {
  return DOM('div', props, children);
}

export function first(obj, predicate) {
  const array = asArray(obj);
  if (predicate) {
    return first(array.filter(predicate));
  }
  return array.length ? array[0] : null;
}

export function asArray(objOrArray) {
  return Array.isArray(objOrArray) ? objOrArray : [objOrArray];
}

export function parseFrag(xywh, ratio = 1) {
  const co = xywh.split('=')[1] || '';
  const [x, y, width, height] = co
    .split(',')
    .map(e => e.trim())
    .map(n => parseInt(n, 10));
  return {
    x: x * ratio,
    y: y * ratio,
    width: width * ratio,
    height: height * ratio,
  };
}

export function mapCanvasIds(manifest, canvasIds) {
  if (
    !(
      manifest &&
      manifest.sequences &&
      manifest.sequences[0] &&
      manifest.sequences[0].canvases
    )
  ) {
    return [];
  }
  return canvasIds
    .map(function(canvasId) {
      return first(manifest.sequences[0].canvases, cv => cv.id === canvasId);
    })
    .filter(cv => cv);
}

export const flatten = list => Array.prototype.concat(...list);

export function manifestToStructure(manifest) {
  const allCanvases = manifest.sequences[0].canvases;
  const canvasNumMap = allCanvases.reduce((acc, canvas, num) => {
    acc[canvas['@id']] = num;
    return acc;
  }, {});

  const mapped = manifest.structures.reduce(createMap, {});
  const topLevel = manifest.structures.reduce(findTopLevel, false);

  return createStructure(topLevel, mapped, canvasNumMap);
}

export function startDurationTime(displayRanges) {
  // here we need to make the timeline div proportional to the time coverage of each range
  let start = null;
  let end = null;
  for (let ri = 0; ri < displayRanges.length; ri++) {
    const testRange = displayRanges[ri];
    if (!start || testRange.start < start) {
      start = testRange.start;
    }
    if (!end || testRange.end > end) {
      end = testRange.end;
    }
  }
  const duration = end.getTime() - start.getTime();
  return { start, duration };
}

export function getDisplayRanges(manifest) {
  // wire up ranges into something more useful. This is making a lot of assumptions,
  // needs to be generalised to work with arbitrary manifests
  const rangesOfInterest = manifest.structures
    ? manifest.structures.filter(function(range) {
        return range[TEMPORAL] && range.canvases && range.canvases.length > 0;
      })
    : [];
  return rangesOfInterest.map(function(iiifRange) {
    const dateStrings = iiifRange[TEMPORAL].split('/');
    return {
      start: new Date(dateStrings[0]),
      end: new Date(dateStrings[1]),
      label: iiifRange.label,
      canvases: mapCanvasIds(manifest, iiifRange.canvases),
      id: iiifRange.id,
    };
  });
}

// Polyfills
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function(callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

export function getPalletXPosition(palletW, clientX, windowW, offset = 15) {
  const halfPalletW = palletW / 2;
  if (clientX - halfPalletW - offset <= 0) {
    return offset;
  }
  if (clientX + halfPalletW + offset >= windowW) {
    return windowW - palletW - offset;
  }
  return clientX - halfPalletW;
}

export function generateColour(key) {
  const staticColoursThatWillBeChangedToSeed = [
    '#A84796',
    '#EC047D',
    '#D71D1B',
    '#DC876C',
    '#CA8A4D',
    '#EDB26C',
    '#FCC31D',
    '#F38413',
    '#A64D3A',
    '#CA8B7B',
  ];
  return staticColoursThatWillBeChangedToSeed[
    key % staticColoursThatWillBeChangedToSeed.length
  ];
}

export class DeepStructureState {
  constructor(structure) {
    this.structure = structure;
    this.structure.forEach(assignNumber({ num: 0 }));
    this.structure.forEach((topLevel, key) => {
      function assignLevel(obj) {
        obj.level = key;
        if (obj.children) {
          obj.children.forEach(assignLevel);
        }
      }

      assignLevel(topLevel);
    });
    this.maxDepth = depthOf(this.structure);
    this.depthMap = mapDepths(this.structure, this.maxDepth);
    this.flatItems = flattenAll(this.structure).sort(sortByKey);
    this.depth = 0;
    this.topKeys = this.levelKeys(0);
  }

  setDepth(depth) {
    this.depth = depth;
    return this;
  }

  inRange(depth) {
    return this.maxDepth >= depth;
  }

  increaseDepth() {
    if (this.inRange(this.depth + 1)) {
      this.setDepth(this.depth + 1);
    }
  }

  decreaseDepth() {
    if (this.depth > 0) {
      this.setDepth(this.depth - 1);
    }
  }

  levelKeys = level => this.depthMap[level].items.map(item => item.key);

  getBreadCrumbs(key) {
    const reducer = path => (found, item) => {
      if (found) {
        return found;
      }
      if (item.key === key) {
        return { item, path };
      }
      if (item.children) {
        const childPath = [...path, item];
        return item.children.reduce(reducer(childPath), false);
      }
      return found;
    };

    return this.structure.reduce(reducer([]), false);
  }

  matchRangeReducer = canvasIndex => (state, item) => {
    if (matchesRange(item, canvasIndex)) {
      return item;
    }
    return state;
  };

  getModel(canvasIndex) {
    const state = {};
    state.structure = this.structure;

    // Current level
    state.currentViews = findLevel(this.structure, canvasIndex, this.depth);
    state.currentKeys = this.levelKeys(this.depth);
    state.current = new CurrentLevel(state.currentViews, state.currentKeys);

    state.activeItem = state.currentViews.reduce(
      this.matchRangeReducer(canvasIndex)
    );
    state.breadcrumbs = this.getBreadCrumbs(state.activeItem.key);

    // Top level
    state.top = this.structure
      .filter(range => matchesRange(range, canvasIndex))
      .pop();
    state.topKeys = this.topKeys;
    state.activeItemIsTop = state.topKeys.indexOf(state.activeItem.key) !== -1;

    state.depth = this.depth;

    return state;
  }
}

export class CurrentLevel {
  constructor(currentLevelViews, fullLevelKeys) {
    this.currentLevelViews = currentLevelViews;
    this.keys = currentLevelViews.map(item => item.key);
    this.first = currentLevelViews[0]
      ? fullLevelKeys.indexOf(currentLevelViews[0].key)
      : null;
    this.last = fullLevelKeys.indexOf(
      currentLevelViews[currentLevelViews.length - 1].key
    );
    this.previous = this.first > 0 ? fullLevelKeys[this.first - 1] : null;
    this.next =
      this.last < fullLevelKeys.length ? fullLevelKeys[this.last + 1] : null;
  }

  findCurrent(key) {
    const index = this.keys.indexOf(key);
    if (index !== -1) {
      return this.currentLevelViews[index];
    }
  }

  isNext(key) {
    return this.next && this.next === key;
  }

  isPrevious(key) {
    return this.previous && this.previous === key;
  }
}

export function sortByKey(a, b) {
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
}

export function depthOf(object, level = 0) {
  const levels = [];
  for (const singleObj of object) {
    if (singleObj.children) {
      const depth = depthOf(singleObj.children, level + 1);
      levels.push(depth);
    }
  }
  level = Math.max(level, ...levels);
  return level;
}

export function findLevel(arr, canvasIndex, targetLevel, level = 0) {
  if (!arr) {
    return [];
  }
  if (targetLevel === level) {
    return arr || [];
  }
  const found = arr.reduce(findChildrenMatchingRange(canvasIndex), false);
  const nextLevel = level + 1;
  if (targetLevel === nextLevel) {
    return found.children ? found.children : found ? [found] : [];
  }
  return findLevel(found.children, targetLevel, nextLevel);
}

export const RANGE_DISPLAY_NONE = 'RANGE_DISPLAY_NONE';
export const RANGE_DISPLAY_LARGE = 'RANGE_DISPLAY_LARGE';
export const RANGE_DISPLAY_PREV_NEXT = 'RANGE_DISPLAY_PREV_NEXT';

// export function computeStyleFromItem(visibility, item) {
//   if (visibility === RANGE_DISPLAY_NONE) {
//     return { flex: 0.0001, 'flex-basis': '0px', transform: 'translateX(3px)' };
//   }
//   if (visibility === RANGE_DISPLAY_PREV_NEXT) {
//     return { flex: '0 0 80px', transform: 'initial' };
//   }
//   if (visibility === RANGE_DISPLAY_LARGE && item) {
//     return {
//       flex: item.range[1] - item.range[0],
//       'flex-basis': '0px',
//       transform: 'initial',
//     };
//   }
//   return {};
// }

export function renderTemporal({ temporal }) {
  if (!temporal) {
    return '';
  }
  if (temporal.length <= 2) {
    return temporal.join(' - ');
  }
  return Math.min(temporal) + ' - ' + Math.max(temporal);
}

export function matchesRange(item, canvasIndex) {
  if (!item || !item.range) {
    return false;
  }
  const [from, to] = item.range;
  return canvasIndex >= from && canvasIndex <= to;
}

export function findChildrenMatchingRange(canvasIndex) {
  return (found, structure) => {
    if (found === false && matchesRange(structure, canvasIndex)) {
      return structure;
    }
    return found;
  };
}

export function flattenDepth(object, targetLevel, level = 0) {
  if (targetLevel === level) {
    return object;
  }
  return object.reduce((children, singleChild) => {
    if (level + 1 === targetLevel) {
      return children.concat(
        singleChild.children ? singleChild.children : [singleChild]
      );
    } else {
      return children.concat(
        singleChild.children
          ? flattenDepth(singleChild.children, targetLevel, level + 1)
          : singleChild
      );
    }
  }, []);
}

export function flattenAll(object) {
  return object.reduce((children, singleChild) => {
    children.push(singleChild);
    return children.concat(
      singleChild.children ? flattenAll(singleChild.children) : []
    );
  }, []);
}

export function assignNumber(vars) {
  return singleItem => {
    singleItem.key = vars.num;
    vars.num += 1;
    if (singleItem.children) {
      singleItem.children.forEach(assignNumber(vars));
    }
  };
}

export function mapDepths(structure, maxDepth) {
  const depthMap = [];
  for (let i = 0; i <= maxDepth; i++) {
    depthMap.push({
      depth: i,
      items: flattenDepth(structure, i),
    });
  }
  return depthMap;
}
