## jQuery

入口函数

```javascript
//第一种写法
$(document).ready(function() {
	
});
//第二种写法
$(function() {
	
});
```

jQuery入口函数与js入口函数的对比：

1. JavaScript的入口函数要等到页面中所有资源（包括图片、文件）加载完成才开始执行。
   2.jQuery的入口函数只会等待文档树加载完成就开始执行，并不会等待图片、文件的加载。

### 基本选择器

| 名称    | 用法                 | 描述                     |
| ----- | ------------------ | :--------------------- |
| ID选择器 | $(“#id”);          | 获取指定ID的元素              |
| 类选择器  | $(“.class”);       | 获取同一类class的元素          |
| 标签选择器 | $(“div”);          | 获取同一类标签的所有元素           |
| 并集选择器 | $(“div,p,li”);     | 使用逗号分隔，只要符合条件之一就可。     |
| 交集选择器 | $(“div.redClass”); | 获取class为redClass的div元素 |

> 总结：跟css的选择器用法一模一样。

### 层级选择器

| 名称    | 用法          | 描述                              |
| ----- | ----------- | :------------------------------ |
| 子代选择器 | $(“ul>li”); | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素  |
| 后代选择器 | $(“ul li”); | 使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等 |

> 总结：跟css的选择器用法一模一样。

### 过滤选择器

| 名称         | 用法                                 | 描述                                 |
| ---------- | ---------------------------------- | :--------------------------------- |
| :eq（index） | $(“li:eq(2)”).css(“color”, ”red”); | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始。 |
| :odd       | $(“li:odd”).css(“color”, ”red”);   | 获取到的li元素中，选择索引号为奇数的元素              |
| :even      | $(“li:even”).css(“color”, ”red”);  | 获取到的li元素中，选择索引号为偶数的元素              |

> 总结：这类选择器都带冒号

### 筛选选择器(方法)

| 名称                 | 用法                          | 描述                         |
| ------------------ | --------------------------- | -------------------------- |
| children(selector) | $(“ul”).children(“li”)      | 相当于$(“ul>li”)，子类选择器        |
| find(selector)     | $(“ul”).find(“li”);         | 相当于$(“ul li”),后代选择器        |
| siblings(selector) | $(“#first”).siblings(“li”); | 查找兄弟节点，不包括自己本身。            |
| parent()           | $(“#first”).parent();       | 查找父亲                       |
| eq(index)          | $(“li”).eq(2);              | 相当于$(“li:eq(2)”),index从0开始 |
| next()             | $(“li”).next()              | 找下一个兄弟                     |
| prev()             | $(“li”).prev()              | 找上一次兄弟                     |

> 总结：筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。

```javascript
 /*1.设置一个样式*/
    //两个参数  设置的样式属性,具体样式
    $('li').css('color','red');
    //传入对象（设置的样式属性:具体样式）
    $('li').css({'color':'red'});
    /*2.设置多个样式*/
    $('li').css({
        'color':'green',
        'font-size':'20px'
    });
/*1.添加一个类*/
    $('li').addClass('now');
    /*2.删除一个类*/
    $('li').removeClass('now');
    /*3.切换一个类  有就删除没有就添加*/
    $('li').toggleClass('now');
    /*4.匹配一个类  判断是否包含某个类  如果包含返回true否知返回false*/
    $('li').hasClass('now');
/*1.获取属性*/
    $('li').attr('name');
    /*2.设置属性*/
    $('li').attr('name','tom');
    /*3.设置多个属性*/
    $('li').attr({
        'name':'tom',
        'age':'18'
    });
    /*4.删除属性*/
    $('li').removeAttr('name');
/*对于布尔类型的属性，不要attr方法，应该用prop方法 prop用法跟attr方法一样。*/
    $("#checkbox").prop("checked");
    $("#checkbox").prop("checked", true);
    $("#checkbox").prop("checked", false);
    $("#checkbox").removeProp("checked");
```

动画

```javascript
 /*1.展示动画*/
	$('li').show();
    /*2.隐藏动画*/
    $('li').hide();
    /*3.切换展示和隐藏*/
    $('li').toggle();
 /*1.滑入动画*/
    $('li').slideDown();
    /*2.滑出动画*/
    $('li').slideUp();
    /*3.切换滑入滑出*/
    $('li').slideToggle();
 /*1.淡入动画*/
    $('li').fadeIn();
    /*2.淡出动画*/
    $('li').fadeOut();
    /*3.切换淡入淡出*/
    $('li').fadeToggle();
    $('li').fadeTo('speed','opacity');
/*
    * 自定义动画
    * 参数1：需要做动画的属性
    * 参数2：需要执行动画的总时长
    * 参数3：执行动画的时候的速度
    * 参数4：执行动画完成之后的回调函数
    * 
*/
	$('#box1').animate({left:800},5000);
    $('#box2').animate({left:800},5000,'linear');
    $('#box3').animate({left:800},5000,'swing',function () {
        console.log('动画执行完成');
    });
```

#### stop

```javascript
 	/*1.停止当前动画  如果动画队列当中还有动画立即执行*/
    //$('div').stop();
    /*2.和stop()效果一致  说明这是默认设置*/
    //$('div').stop(false,false);
    /*3.停止当前动画  清除动画队列*/
    //$('div').stop(true,false);
    /*4.停止当前动画并且到结束位置  清除了动画队列*/
    //$('div').stop(true,true);
    /*5.停止当前动画并且到结束位置  如果动画队列当中还有动画立即执行*/
    $('div').stop(false,true);
```

节点

```javascript
    /*追加自身的最后面  传对象和html格式代码*/
    $('#box').append('<a href="http://www.baidu.com" target="_blank"><b>百度3</b></a>');
    $('#box').append($('a'));
    /*追加到目标元素最后面  传目标元素的选择器或者对象*/
    $('<a href="http://www.baidu.com" target="_blank"><b>百度3</b></a>').appendTo($('#box'));
    $('a').appendTo('#box');
    
    prepend();
    prependTo();
    after();
    before();
 /*1.清空box里面的元素*/
    /* 清理门户 */
    $('#box').empty();
    /*2.删除某个元素*/
    /* 自杀 */
    $('#box').remove();
//克隆
var $cloneP = $('p').clone(true);
```

### val方法

> val方法用于设置和获取表单元素的值.

### html方法与text方法

> html方法相当于innerHTML  text方法相当于innerText

```javascript
	//获取元素距离document的位置,返回值为对象：{left:100, top:100}
    $(selector).offset();
    //获取相对于其最近的有定位的父元素的位置。
    $(selector).position();
```

### on注册事件

```javascript
	// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
    // 第二个参数：selector, 执行事件的后代元素（可选），如果没有后代元素，那么事件将有自己执行。
    // 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
    // 第四个参数：handler，事件处理函数
    $(selector).on(events,[selector],[data],handler);
```

### 事件解绑

```javascript
	// 解绑匹配元素的所有事件
    $(selector).off();
    // 解绑匹配元素的所有click事件
    $(selector).off("click");
```

### 触发事件

```javascript
 	$(selector).click(); //触发 click事件
    $(selector).trigger("click");
```

### each	

```javascript
    // 参数一表示当前元素在所有匹配元素中的索引号
    // 参数二表示当前元素（DOM对象）
    $(selector).each(function(index,element){});
```



### jQuery的扩展方法（extend）

http://www.cnblogs.com/zikai/p/5074686.html

```javascript
extend(dest,src1,src2,src3...);
```

​	它的含义是将src1,src2,src3...合并到dest中,返回值为合并后的dest,由此可以看出该方法合并后，是修改了dest的结构的。如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：

```javascript
var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。
```

这样就可以将src1,src2,src3...进行合并，然后将合并结果返回给newSrc了

```javascript
var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
//结果
result={name:"Jerry",age:21,sex:"Boy"}
//后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值
```

#### **省略dest参数**

如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去

**$.extend(src)**

```javascript
$.extend({
hello:function(){alert('hello');}
});
```

就是将hello方法合并到jquery的**全局对象**中.

**$.fn.extend(src)**

将src合并到jquery的**实例对象**中去

例举几个常用的扩展实例

```javascript
$.extend({net:{}});
```

这是在jquery全局对象中扩展一个net命名空间。

```javascript
$.extend($.net,{
hello:function(){alert('hello');}
})
```

这是将hello方法扩展到之前扩展的Jquery的net命名空间中去

(意思是：这个方法扩展到有net命名的空间中用，没有net命名的就不能用)

**Jquery的extend方法还有一个重载原型**

```javascript
extend(boolean,dest,src1,src2,src3...)
```

第一个参数boolean代表是否进行深度拷贝，其余参数和前面介绍的一致，什么叫深层拷贝.

```javascript
var result=$.extend( true, {}, 
{ name: "John", location: {city: "Boston",county:"USA"} }, 
{ last: "Resig", location: {state: "MA",county:"China"} } );
//结果  会将src中的嵌套子对象也进行合并
result={name:"John",last:"Resig",
location:{city:"Boston",state:"MA",county:"China"}}

var result=$.extend( false, {}, 
{ name: "John", location:{city: "Boston",county:"USA"} }, 
{ last: "Resig", location: {state: "MA",county:"China"} } 
);
//结果
result={name:"John",last:"Resig",location:{state:"MA",county:"China"}}
```

### 插件封装

http://www.cnblogs.com/Wayou/p/jquery_plugin_tutorial.html