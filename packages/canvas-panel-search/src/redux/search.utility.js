/**
 * @flow
 */
import Manifesto from 'manifesto.js';
import { AnnotationSelector } from '@canvas-panel/core';

export function formatSingleParam(name: string, value: any | Array<any>) {
  if (Array.isArray(value)) {
    return `${name}=${value.join(' ')}`;
  }
  return `${name}=${value}`;
}

export function constructSearchQuery(query: Query) {
  const params = [];
  const { q, motivation, date, user } = query;

  if (q) {
    params.push(formatSingleParam('q', q));
  }

  if (motivation) {
    params.push(formatSingleParam('motivation', motivation));
  }

  if (date) {
    params.push(formatSingleParam('date', date));
  }

  if (user) {
    params.push(formatSingleParam('user', user));
  }

  if (params.length === 0) {
    return null;
  }

  return params.join('&');
}

export async function fetchSearchResults(query: string) {
  const response = await fetch(query);
  return await response.json();
}

export const noop = (e: any): any => e;

export type SearchResource = string;

export type Motivation =
  | 'painting'
  | 'non-painting'
  | 'commenting'
  | 'describing'
  | 'tagging'
  | 'linking';

export type SearchHit = {
  annotations: Array<string>,
  before: string,
  after: string,
  term: string,
};

export type Annotation = {
  annotation: Manifesto.Annotation,
  on: AnnotationSelector,
};

export type SearchHitSelector = {
  exact: string,
  prefix: string,
  suffix: string,
};

export type SearchQueryResult = {
  within: {
    total: number,
    first?: SearchResource,
    last?: SearchResource,
  },

  next: SearchResource | null,
  previous: SearchResource | null,
  startIndex: number | null,

  resources: Array<Manifesto.Annotation>,
  hits: Array<SearchHit>,
  selectors: Array<SearchHitSelector>,
  resourceMap: { [string]: Annotation },
  canvasMap: { [string]: Array<Manifesto.Annotation> },
};

export type Query = {
  q: string | Array<string> | null,
  motivation?: Motivation | Array<Motivation> | null,
  date?: string | Array<string> | null,
  user?: string | Array<string> | null,
};
