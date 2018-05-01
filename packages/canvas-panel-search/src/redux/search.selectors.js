export function selectCurrentCanvas(state) {
  const manifest = state.manifest.jsonLd;
  const canvases = manifest ? manifest.sequences[0].canvases || [] : [];
  const currentCanvas = state.manifest.currentCanvas;
  return {
    currentCanvas,
    canvases,
  };
}

export function selectHighlights(state) {
  const { currentCanvas, canvases } = selectCurrentCanvas(state);
  const highlights = selectCurrentHighlight(state);

  const currentHighlight = canvases[currentCanvas]
    ? highlights.indexOf(canvases[currentCanvas]['@id'])
    : 0;
  return {
    currentCanvas,
    canvases,
    currentHighlight,
    highlights,
  };
}

function selectCurrentHighlight(state) {
  return state.search &&
    state.search.currentQuery &&
    state.search.queries[state.search.currentQuery]
    ? Object.keys(state.search.queries[state.search.currentQuery].canvasMap)
    : [];
}

export function selectSearchState(state) {
  const searchState = state.search;
  const { currentCanvas, canvases } = selectCurrentCanvas(state);
  const currentQuery = state.search.currentQuery;
  const highlights = selectCurrentHighlight(state);
  const currentHighlight = canvases[currentCanvas]
    ? highlights.indexOf(canvases[currentCanvas]['@id'])
    : 0;

  return {
    currentQuery,
    searchAvailable: !!searchState.service,
    highlights,
    currentHighlight,
  };
}
