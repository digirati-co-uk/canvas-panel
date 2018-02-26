/**
 * @flow
 */
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import AnnotationSelector from './AnnotationSelector';

type SearchResource = string;

type SearchHit = {
  annotations: Array<string>,
  before: string,
  after: string,
  term: string,
};

type Annotation = {
  annotation: Manifesto.Annotation,
  on: AnnotationSelector,
};

type SearchHitSelector = {
  exact: string,
  prefix: string,
  suffix: string,
};

class SearchResults {
  within: {
    total: number,
    first?: SearchResource,
    last?: SearchResource,
  };

  next: SearchResource | null;
  previous: SearchResource | null;
  startIndex: number | null;

  resources: Array<Manifesto.Annotation>;
  hits: Array<SearchHit>;
  selectors: Array<SearchHitSelector>;
  resourceMap: { [string]: Annotation };
  canvasMap: { [string]: Array<Manifesto.Annotation> };

  constructor(jsonLd: any) {
    this.within = jsonLd.within
      ? {
          total: jsonLd.within.total,
          first: jsonLd.within.first,
          last: jsonLd.within.last,
        }
      : {
          total: jsonLd.hits.length || 0,
        };

    this.next = (jsonLd.next: SearchResource);
    this.previous = (jsonLd.previous: SearchResource);

    this.startIndex = jsonLd.startIndex
      ? parseInt(jsonLd.startIndex, 10)
      : null;

    this.resources = (jsonLd.resources || []).map(resource =>
      Manifesto.Utils.createAnnotation(resource)
    );

    this.resourceMap = this.resources.reduce(
      (map, resource: Manifesto.Annotation) => {
        map[resource.id] = resource;
        return map;
      },
      {}
    );

    this.canvasMap = this.resources.reduce(
      (map, resource: Manifesto.Annotation) => {
        const target = resource.getOn().split('#')[0];
        map[target] = map[target] ? map[target] : [];
        map[target].push({
          annotation: resource,
          on: AnnotationSelector.parse(
            resource.getTarget() || resource.getOn()
          ),
        });
        return map;
      },
      {}
    );

    this.hits = (jsonLd.hits || []).map(
      hit =>
        ({
          annotations: hit.annotations
            .map(id => this.resourceMap[id] || null)
            .filter(e => e),
          before: hit.before,
          after: hit.after,
          term: hit.term,
        }: SearchHit)
    );
  }

  getAnnotations(canvasId: string): Array<Annotation> {
    return this.canvasMap[canvasId] || [];
  }
}

export default SearchResults;
