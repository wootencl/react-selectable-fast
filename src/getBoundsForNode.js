/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default (node, containerScroll = { scrollTop: 0, scrollLeft: 0 }) => {
  const { scrollTop, scrollLeft } = containerScroll
  const rect = node.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop + scrollTop,
    left: rect.left + document.body.scrollLeft + scrollLeft,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
  }
}
