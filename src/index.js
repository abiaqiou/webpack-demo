import './index.css'
import './index.less'
import './index.scss'
import './fonts/iconfont.css'

console.log('在 js 文件中 import css 文件')

// 模块热更新
if (module.hot) {
  module.hot.accept('./other.js', () => {
    console.log('other.js 这个文件内容有改变')
  })
}
