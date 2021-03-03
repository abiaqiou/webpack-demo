// main.js in dist
;(() => {
  var __webpack_modules__ = {
    './src/a.js': (module) => {
      eval(
        "const value = 'a'\r\n\r\nmodule.exports = value\r\n\n\n//# sourceURL=webpack://webpack-demo/./src/a.js?"
      )
    },

    './src/index.js': (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const value = __webpack_require__(/*! ./a */ "./src/a.js")\r\n\r\nconsole.log(value)\r\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?'
      )
    },
  }
  var __webpack_module_cache__ = {}
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    })
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)
    return module.exports
  }
  var __webpack_exports__ = __webpack_require__('./src/index.js')
})()

// simple version
var webpack_modules = {
  './src/a.js': (module) => {
    module.exports = 'a'
  },
}

function webpack_require(moduleId) {
  var moduleFn = webpack_modules[moduleId]
  var module = { exports: {} }
  moduleFn(module)
  return module.exports
}

const value = webpack_require('./src/a.js')
console.log(value)
