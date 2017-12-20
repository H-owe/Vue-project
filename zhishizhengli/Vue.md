### Vue（学习整理,详情查文档）

**import xxx from '路径'     //导入**

**export default{**               

​	data(){

​		return {

​		接收数据的变量：[]//数组     {}//对象

​		}

​	}，

​	created(){

​		this.xxx //实例创建后调用的函数

​	},

​	methods:{

​		xxx(){

​			//处理函数

​		}

​	}

**} 导出**(Vue对象)

##### 推荐我们以数据驱动去开发，尽可能少操作Dom,但是你也可以操作Dom

#### 安装（在http://www.bootcdn.cn/上找到，通过script标签引入）

```javascript
<script src="https://unpkg.com/vue"></script>
```

Vue.js 的核心是一个允许采用简洁的模板语法来**声明式**的将数据渲染进 DOM 的系统

```javascript
<div id="app">
  {{ message }}
</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

#### Vue指令（作用：简化DOM操作）

v-bind :title="message"

缩写

:title="message"

将这个元素节点的 `title` 属性和 Vue 实例的 `message` 属性保持一致

v-if="true"

根据指令的值得真假来插入/移除这个元素

v-on:click="事件名"

缩写

@click=“事件名”

用来监听DOM事件

v-model

```javascript
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

指令在表单控件元素上创建双向数据绑定,负责监听用户的输入事件以更新数据

v-show	改变DOM元素的display属性

v-html	能够渲染html标签

v-text	渲染文本内容

v-for  	循环给DOM元素赋值，根据一组数组的选项列表进行渲染

```javascript
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
  
  var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

key

```javascript
<div v-for="item in items" :key="item.id">//key唯一标识，没有id时用index
  <!-- 内容 -->
</div>
```

### MVC

V:视图 负责呈现内容给用户看
C:负责协调、控制
M:模型，处理数据

### MVVM

V：视图 负责呈现内容给用户看 (template渲染部分)
VM：View-Model 负责协调、控制 （Vue实例/对象）
M：模型（Model），处理数据 (来自服务器端的数据data)





#### 修饰符

指令后 . 出来的方法（.trim 自动过滤用户输入的首位空格）

### Vue组件

组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码

组件注册定义（全局、局部）

组件template必须有一个根元素

组件内部的data必须是函数

单文件组件【***】

```javascript
项目中就是用这个
.vue结尾的文件

每个单文件组件，都可以有三部分
	template 写页面结构
	style 对我们写的页面结构代码样式
	script 处理业务逻辑，比如给我们页面提供数据，处理用户的点击
    
    <template>
 	 <div>This will be pre-compiled</div>
	</template>
	<script src="./my-component.js"></script>
	<style src="./my-component.css"></style>
```

#### 父子组件

父子组件的关系可以总结为 **prop 向下传递，事件向上传递**

#### props

子组件要显式地用 [`props` 选项](https://cn.vuejs.org/v2/api/#props)声明它预期的数据

```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>{{ message }}</span>'
})
```

```javascript
<child message="hello!"></child>//字面量props传递的是字符串
```

动态props

用 `v-bind` 来动态地将 prop 绑定到父组件的数据

```javascript
<child :my-message="parentMsg"></child>//parentMsg是父组件动态传来的数据，要v-bind绑定
```

#### 非父组件通讯

使用一个空的 Vue 实例作为事件总线

```javascript
var bus = new Vue()

// 触发组件 A 中的事件
bus.$emit('id-selected', 1)//参数：事件名，参数
```

```javascript
// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
bus.$on('id-selected',(id)=>{
  this.Id = id //箭头函数里没有this，但可以用this，它代表外面的Vue对象实例
})
```

复杂情况使用Vuex；

### Vue插件

通过全局方法 Vue.use() 使用插件(基于vue的插件可以这样用)

```javascript
Vue.use(MyPlugin)
```

添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现;

一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

npm i xxx --save-dev/开放模式--save/生产模式  -g/全局



#### Vue过滤器

过滤器可以用在两个地方：**双花括号插值和 v-bind 表达式** (后者从 2.1.0+ 开始支持)

```javascript
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

Vue.filter('capitalize', function (value) { //全局
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


filters: {//私有
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

#### vue-resource（发送网络请求）

```javascript
//ES6语法（get请求）
 const url = '...'
this.$http.get(url).then(e=>{
  this.xxx = e.data.message
  //console.log(this.xxx)
})
```

```javascript
//(post请求)
const url = '...'
/*参数1：url
  参数2：参数
  参数3：设置请求头
*/
this.$http.post(url,{name:'xxx',age:22},{emulateJSON:true}).then(e=>{
  this.xxx = e.data.message
  //console.log(this.xxx)
})
```

```javascript
//jsonp请求
const url = '...'
this.$http.jsonp(url).then(e=>{
  this.xxx = e.data.message
  //console.log(this.xxx)
})
```

### Vue路由(深入查Vue文档)

//1.定义（路由）组件

```javascript
const Foo = { template: '<div>foo</div>' }
```

//可以从其他文件导进来

import  aaa from '路径'

//2。创建路由对象，设置路由规则

```javascript
 const router = new VueRouter({
        routes : [
            { path: '/foo', component: Foo },
 			{ path: '/bar', component: Bar },
          	/ 动态路径参数 以冒号开头
    		{ path: '/user/:id', component: User }
        ]
    })
```

//3.挂载根实例

```javascript
var vm = new Vue({
        el:"#app",
        router
        // 缩写  router:router
    })
```

#### 编程式导航

**在 Vue 实例内部，你可以通过\$router 访问路由实例。因此你可以调用 this.$router.push**

#### 声明式导航

```javascript
 <router-link :to="...">
```

#### `router.go(n)`

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

#### `router.replace`

替换掉当前的 history 记录

### Vuex(仓库)

集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

### Vue底层理解

 http://dwz.cn/74B4my

1. 首先，需要利用Object.defineProperty，将要观察的对象，转化成getter/setter，以便拦截对象赋值与取值操作，称之为Observer；
2. 需要将DOM解析，提取其中的指令与占位符，并赋与不同的操作，称之为Compiler；
3. 需要将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Observer观察到对象数据变化时，接收通知，同时更新DOM，称之为Watcher；
4. 最后，需要一个公共入口对象，接收配置，协调上述三者，称为Vue;

知识基础

**Object.defineProperty()** 方法直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

http://blog.csdn.net/u011884290/article/details/51941605

```javascript
Object.defineProperty(obj, prop, descriptor)
```

- `obj` 需要定义属性的对象。
- `prop` 需被定义或修改的属性名。
- `descriptor` 需被定义或修改的属性的描述符

默认情况下，使用`Object.defineProperty()` 增加的属性值是不可改变的。

**对象里目前存在的属性描述符有两种主要形式：** 
数据描述符和存取描述符

数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

```javascript
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,   //可被修改的
  configurable : true, //可被删除的，除writable外其他特性可以被修改
  enumerable : true //可被枚举的
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```

Setters 和 Getters

```javascript
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {		//获取值
      console.log('get!'); 
      return temperature;
    },
    set: function(value) {  //存（改）值
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }
```

```javascript
  var obj = {}

    Object.defineProperty(obj,"a",{
        value:111,              //数据描述与存取描述只能存在一种
        // get:function(){
        //     a=10;
        //     return a;
        // }
    })
    
    console.log(obj.a) 
```



