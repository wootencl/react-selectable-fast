'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = isNodeInRoot
function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }

  return false
}
