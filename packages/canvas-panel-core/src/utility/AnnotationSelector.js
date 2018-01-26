export default class AnnotationSelector {
  static DIRECTION_LTR = 'ltr';
  static DIRECTION_RTL = 'rtl';
  static DIRECTION_AUTO = 'auto';
  static W3C_SELECTOR = /[#&?]xywh=(pixel:|percent:)?(\d+),(\d+),(\d+),(\d+)/;

  static fromJsonLD(jsonLd) {
    return AnnotationSelector.parse(jsonLd);
  }

  static fromArray(multipleSelectors) {
    return multipleSelectors.map(annotation =>
      AnnotationSelector.parse(annotation)
    );
  }

  constructor(
    id,
    scale,
    format,
    language,
    processingLanguage,
    textDirection,
    selector
  ) {
    if (
      textDirection &&
      (textDirection !== AnnotationSelector.DIRECTION_AUTO &&
        textDirection !== AnnotationSelector.DIRECTION_LTR &&
        textDirection !== AnnotationSelector.DIRECTION_RTL)
    ) {
      throw new Error('textDirection must be ONE of [ltr, rtl, auto]');
    }

    this.id = id;
    this.source = (id || '').split('#')[0];
    this.format = format;
    this.language = language;
    this.processingLanguage = processingLanguage;
    this.textDirection = textDirection;
    this.selector = AnnotationSelector.parseTarget(id, scale, selector);
  }

  static fromTarget(target, selector) {
    const annotationSelector = new AnnotationSelector();
    annotationSelector.source = target;
    annotationSelector.selector = selector;
    return annotationSelector;
  }

  static parse(text, scale = 1) {
    if (!text) {
      return null;
    }

    // https://www.w3.org/TR/annotation-model/#bodies-and-targets
    if (text.id) {
      return new AnnotationSelector(
        text.id,
        scale,
        text.format,
        text.language,
        text.processingLanguage,
        text.textDirection
      );
    }

    // https://www.w3.org/TR/annotation-model/#selectors
    if (text.source) {
      return new AnnotationSelector(
        text.source,
        scale,
        text.format,
        text.language,
        text.processingLanguage,
        text.textDirection,
        text.selector
      );
    }

    // @todo check for is text or is object and construct accordingly.
    return new AnnotationSelector(text, scale);
  }

  static parseTarget(source, scale = 1, selector = null) {
    let toParse = source;
    if (selector && selector.type === 'FragmentSelector') {
      toParse = `${source}#${selector.value}`;
    }

    const match = AnnotationSelector.W3C_SELECTOR.exec(toParse);
    if (match) {
      const [_, __, x, y, width, height] = match.map(
        v => parseInt(v, 10) * scale
      );
      return {
        unit: match[1] === 'percent:' ? 'percent' : 'pixel',
        scale,
        expanded: true,
        x,
        y,
        width,
        height,
        toString() {
          return source.split('#')[0];
        },
      };
    }
    return source;
  }

  toJSON() {
    if (
      !this.selector ||
      this.selector.x === null ||
      isNaN(Math.floor(this.selector.x)) ||
      this.selector.y === null ||
      isNaN(Math.floor(this.selector.y))
    ) {
      return this.source;
    }

    if (
      this.selector.width === null ||
      isNaN(this.selector.width) ||
      this.selector.height === null ||
      isNaN(this.selector.height)
    ) {
      return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(
        this.selector.y
      )},0,0`;
    }

    return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(
      this.selector.y
    )},${Math.floor(this.selector.width)},${Math.floor(this.selector.height)}`;
  }

  toString() {
    return this.id;
  }
}
