export function processStructure(structure) {
  structure.forEach(assignNumber({ num: 0 }));
  structure.forEach((topLevel, key) => {
    function assignLevel(obj) {
      obj.level = key;
      if (obj.children) {
        obj.children.forEach(assignLevel);
      }
    }

    assignLevel(topLevel);
  });
  return structure;
}

export function levelKeys(depthMap, level) {
  if (!depthMap[level] || !depthMap[level].items) {
    return [];
  }
  return depthMap[level].items.map(item => item.key);
}

export function matchRangeReducer(canvasIndex) {
  return (state, item) => {
    if (matchesRange(item, canvasIndex)) {
      return item;
    }
    return state;
  };
}

export function getBreadCrumbs(structure, key) {
  const getBreadCrumbsReducer = path => (found, item) => {
    if (found) {
      return found;
    }
    if (item.key === key) {
      return { item, path };
    }
    if (item.children) {
      const childPath = [...path, item];
      return item.children.reduce(getBreadCrumbsReducer(childPath), false);
    }
    return found;
  };

  return structure.reduce(getBreadCrumbsReducer([]), false);
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

export function createStructure(topLevel, mapped, canvasNumMap) {
  const expand = expander(mapped);
  return (topLevel.members || []).map(enhancedStructure(expand, canvasNumMap));
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

export function manifestToStructure(manifest) {
  const allCanvases = manifest.sequences[0].canvases;
  const canvasNumMap = allCanvases.reduce((acc, canvas, num) => {
    acc[canvas['@id']] = num;
    return acc;
  }, {});

  const mapped = manifest.structures.reduce(createMap, {});
  const topLevel = manifest.structures.reduce(findTopLevel, false);

  return createStructure(
    topLevel || manifest.structures[0],
    mapped,
    canvasNumMap
  );
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

export function matchesRange(item, canvasIndex) {
  if (!item || !item.range) {
    return false;
  }
  const [from, to] = item.range;
  return canvasIndex >= from && canvasIndex <= to;
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

export function findChildrenMatchingRange(canvasIndex) {
  return (found, structure) => {
    if (found === false && matchesRange(structure, canvasIndex)) {
      return structure;
    }
    return found;
  };
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
