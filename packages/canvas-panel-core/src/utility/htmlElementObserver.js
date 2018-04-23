/**
 * @flow
 */

export default function htmlElementObserver($element: HTMLElement) {
  return (onChange: ({ [string]: any }) => void) => {
    try {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(({ type }) => {
          if (type === 'attributes') {
            onChange({ ...$element.dataset });
          }
        });
      });

      observer.observe($element, { attributes: true });
    } catch (e) {
      console.warn('Could not set up observer', e);
    }
  };
}
