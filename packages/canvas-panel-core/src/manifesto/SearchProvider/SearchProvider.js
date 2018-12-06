/**
 * @flow
 */
import React, { Component } from 'react';
import Manifesto from 'manifesto.js';
import functionOrMapChildren from '../../utility/functionOrMapChildren';
import SearchResults from '../../utility/SearchResults';

type Motivation =
  | 'painting'
  | 'non-painting'
  | 'commenting'
  | 'describing'
  | 'tagging'
  | 'linking';

type Props = {
  manifest: Manifesto.Manifest,
  canvas: Manifesto.Canvas,
  q: string | Array<string> | null,
  motivation: Motivation | Array<Motivation> | null,
  date: string | Array<string> | null,
  user: string | Array<string> | null,
  children: any,
};

type State = {
  searchService: Manifesto.Service | null,
  results: any,
  query: string | null,
  isLoading: boolean | null,
};

class SearchProvider extends Component<Props, State> {
  state = {
    searchService: null,
    results: [],
    isLoading: false,
    query: null,
  };

  static formatSingleParam(name: string, value: any | Array<any>) {
    if (Array.isArray(value)) {
      return `${name}=${value.join(' ')}`;
    }
    return `${name}=${value}`;
  }

  static constructSearchQuery(
    searchService: Manifesto.Service,
    q: string | Array<string> | null,
    motivation: Motivation | Array<Motivation> | null,
    date: string | Array<string> | null,
    user: string | Array<string> | null
  ) {
    const params = [];

    if (q) {
      params.push(SearchProvider.formatSingleParam('q', q));
    }

    if (motivation) {
      params.push(SearchProvider.formatSingleParam('motivation', motivation));
    }

    if (date) {
      params.push(SearchProvider.formatSingleParam('date', date));
    }

    if (user) {
      params.push(SearchProvider.formatSingleParam('user', user));
    }

    if (params.length === 0) {
      return null;
    }

    return `${searchService.__jsonld['@id']}?${params.join('&')}`;
  }

  componentWillMount() {
    const manifest: Manifesto.Manifest = this.props.manifest;
    const searchService: Manifesto.Service = manifest.getSearchService();

    this.performSearch(
      this.props.q,
      this.props.motivation,
      this.props.date,
      this.props.user,
      searchService
    );
  }

  componentWillReceiveProps(newProps: Props) {
    const manifest: Manifesto.Manifest = newProps.manifest;
    const searchService: Manifesto.Service = manifest.getSearchService();
    if (
      newProps.q !== this.props.q ||
      newProps.motivation !== this.props.motivation ||
      newProps.date !== this.props.date ||
      newProps.user !== this.props.user
    ) {
      this.performSearch(
        newProps.q,
        newProps.motivation,
        newProps.date,
        newProps.user,
        searchService
      );
    }
  }

  performSearch(
    q: string | Array<string> | null,
    motivation: Motivation | Array<Motivation> | null,
    date: string | Array<string> | null,
    user: string | Array<string> | null,
    searchService: Manifesto.Service | null
  ) {
    const query = SearchProvider.constructSearchQuery(
      searchService,
      q,
      motivation,
      date,
      user
    );

    if (query && query !== this.state.query) {
      fetch(query)
        .then(resp => resp.json())
        .then(results =>
          this.setState({
            results: new SearchResults(results),
            isLoading: false,
          })
        );
    } else {
    }

    this.setState({
      isLoading: true,
      query,
    });
  }

  render() {
    const { children, q, motivation, date, user, ...props } = this.props;
    const { isLoading, query, results } = this.state;
    if (isLoading) {
      return <div>loading search...</div>;
    }

    return functionOrMapChildren(children, {
      search: {
        query,
        results,
        q,
        motivation,
        date,
        user,
      },
      ...props,
    });
  }
}

export default SearchProvider;
