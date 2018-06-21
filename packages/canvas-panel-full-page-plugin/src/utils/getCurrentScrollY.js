export default function getCurrentScrollY(el = null) {
  if (el) {
    return el.scrollTop;
  }

  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}
