/**
 * @flow
 */
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import parseSelectorTarget from './parseSelectorTarget';

type Region = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type CanvasRegion = {
  canvases: Array<string>,
  regions: Array<Region | null>,
};

function getCanvasId(item): string | null {
  if (typeof item === 'string') {
    return item;
  }
  if (item.type === 'Canvas') {
    return item.id;
  }
  if (item.type === 'SpecificResource') {
    return typeof item.source === 'string' ? item.source : item.source.id;
  }
  return null;
}

function getSelector(item, canvasId) {
  const selector = parseSelectorTarget(canvasId);
  if (selector && selector !== canvasId) {
    return selector;
  }
  if (item.selector) {
    const selectorValue = item.selector.value || item.selector;
    const itemSelector = parseSelectorTarget(`#${selectorValue}`);

    if (itemSelector !== selectorValue) {
      return itemSelector;
    }
  }
  return null;
}

export default function extractCanvasAndRegionsFromRange(
  range: Manifesto.Range
): CanvasRegion {
  const manifestoCanvasIds = range.getCanvasIds();
  const rangeItemsCount = range.__jsonld.items
    ? range.__jsonld.items.length
    : manifestoCanvasIds.length;

  if (manifestoCanvasIds.length === rangeItemsCount) {
    return {
      canvases: manifestoCanvasIds,
      regions: [],
    };
  }

  return range.__jsonld.items.reduce(
    (acc: CanvasRegion, item) => {
      const canvasId = getCanvasId(item);
      if (canvasId) {
        // Push together, even if null, to maintain indexes.
        acc.canvases.push(canvasId);
        acc.regions.push(getSelector(item, canvasId));
      }

      return acc;
    },
    {
      canvases: [],
      regions: [],
    }
  );
}
