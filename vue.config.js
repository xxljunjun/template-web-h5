// vue.config.js
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
const Version = new Date().getTime()
let publicPath = './'
switch (process.env.NODE_ENV) {
  case 'dev':
    publicPath = './'
    break
  case 'testus':
    publicPath = 'https://db3imdgpgx2uh.cloudfront.net'
}
module.exports = {
	publicPath: publicPath,
	// 将构建好的文件输出到哪里
	outputDir: 'dist/static',

	// 放置生成的静态资源(js、css、img、fonts)的目录。
	assetsDir: 'static',

	// 指定生成的 index.html 的输出路径
	indexPath: 'index.html',

	// 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
	runtimeCompiler: false,

	// 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
	transpileDependencies: [],

	// 生产环境关闭 source map
	productionSourceMap: false,

	// lintOnSave: true,

	// 配置css
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		sourceMap: true,
	},
	chainWebpack: config => {
		//cdn中js加时间戳
		config.output.filename('js/[name].[hash].' + Version + '.js').end()
		config.output.chunkFilename('js/[name].[hash].' + Version + '.js').end()
		//配置标题
		config.plugin('html').tap((args) => {
		args[0].title = 'H5模板'
		return args
		})
		// 配置别名
		config.resolve.alias
			.set('@', resolve('src'))
	},

	configureWebpack: (config) => {

	},

	// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
	parallel: require('os').cpus().length > 1,
	// 向 PWA 插件传递选项。
	// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {

	},
	devServer: {
		host: '0.0.0.0',
		port: 8888, // 端口号
		hot: true,//启用本地node服务中的socket长连接来实时通信
		https: false, // https:{type:Boolean}
		open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
		// 配置多个代理
		proxy: {
			'/api': {
				target: 'https://www.mock.com',
				ws: true, // 代理的WebSockets
				changeOrigin: true, // 允许websockets跨域
				pathRewrite: {
					'^/api': ''
				}
			},
			'/he': {
				target: 'https://way.jd.com',
				ws: true, // 代理的WebSockets
				changeOrigin: true, // 允许websockets跨域
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}