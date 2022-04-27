# Exchanger

* ### [Project setup](#setup) 🚀
* ### [Project tech stack](#stack) 🍔
* ### [Project features](#features)

## <a name="setup"></a> Project setup 🚀 
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## <a name="stack"></a> Project tech stack 🍔

For this project I used:

* <a href="https://vuejs.org/">Vue 3</a>
* <a href="https://router.vuejs.org/">Vue router</a>
* <a href="https://vuex.vuejs.org/">Vuex</a>
* <a href="https://github.com/ktsn/vuex-smart-module">Vuex-smart-module</a>
* <a href="https://www.typescriptlang.org/">Typescript</a>
* <a href="https://tailwindcss.com/">Tailwind CSS</a>
* <a href="https://axios-http.com/">Axios</a>
* <a href="https://www.chartjs.org/">ChartJS</a>

APIs I used:
* <a href="https://www.coinapi.io/">coinAPI</a>
* <a href="https://mockapi.io/">mockAPI</a>
* <a href="https://nomics.com/">nomicsAPI</a>

## <a name="stack"></a> Project features

Developing this project I studied how to use built-in features of VueJS and some libraries.

### Slots
I used slots to implement some reusable components such as main layout. It provides default blocks: topbar and header. It also can contain main content.

I used slots to implement quiz app wrappers. Each component can be redisgned in order to change some stylings. It doens't have any default handlers, so you need to pass your handlers to manage quiz properly.

### Vuex-smart-module
This library provied a bit different way of creating vuex store from default vuex. I used it to create the store and the modules