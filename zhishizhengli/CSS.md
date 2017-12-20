### CSS3

#### 选择器

### 结构(位置)伪类选择器

- :first-child :选取属于其父元素的首个子元素的指定选择器
- :last-child :选取属于其父元素的最后一个子元素的指定选择器
- :nth-child(n) ： 匹配属于其父元素的第 N 个子元素，不论元素的类型
- :focus   : 设置对象在成为输入焦点（该对象的onfocus事件发生）时的样式
- :first-of-type   匹配同类型中的第一个同级兄弟元素

#### 伪元素选择器

1. E::first-letter文本的第一个单词或字（如中文、日文、韩文等）

2. E::first-line 文本第一行；

3. E::selection 可改变选中文本的样式；

4. E::before和E::after（理解）

   在E元素内部的开始位置和结束位创建一个元素，该元素为行内元素，且必须要结合content属性使用

#### 目标伪类选择器

:target目标伪类选择器 :选择器可用于选取当前活动的目标元素

### 动画

 animation

```css
animation:动画名称 动画时间 运动曲线  何时开始  播放次数  是否反方向;
```

```css
animation-iteration-count:infinite;  无限循环播放
animation-play-state:paused;   暂停动画"
```



@keyframes

```javascript
@keyframes testanimations {
	from { transform: translate(0, 0); }
	20% { transform: translate(20px, 20px); }
	40% { transform: translate(40px, 0); }
	60% { transform: translate(60px, 20); }
	80% { transform: translate(80px, 0); }
	to { transform: translate(100px, 20px); }
}
```

#### transform(2D/3D转换)

移动 translate(x, y)

缩放 scale(x, y)

旋转 rotate(deg)

transform-origin可以调整元素转换变形的原点

倾斜 skew(deg, deg)

透视(perspective)

perspective 一般作为一个属性，设置给父元素，作用于所有3D转换的子元素.

backface-visibility 属性定义当元素不面向屏幕时是否可见.

```css
div {
			width: 224px;
			height: 224px;
			margin: 100px auto;
			position: relative;
		}
		div img {
			position: absolute;
			top: 0;
			left: 0;
			transition: all 1s; 
		}
		div img:first-child {
			z-index: 1;
			backface-visibility: hidden; /* 不是正面对象屏幕，就隐藏 */
		}
		div:hover img {
			transform: rotateY(180deg);
}
```



#### transition（过渡）

```
transition: 要过渡的属性 过渡时间  速度曲线 何时开始（delay）;
```

linear-gradient()

线性渐变

to left：

设置渐变为从右到左。相当于: 270deg

to right：

设置渐变从左到右。相当于: 90deg

to top：

设置渐变从下到上。相当于: 0deg

to bottom：

设置渐变从上到下。相当于: 180deg。这是默认值，等同于留空不写。

radial-gradient()

径向渐变

#### 函数（作属性值用）

**calc()** = calc(四则运算)

**toggle()** = toggle(<value>#)

允许子孙元素使用取值序列中的值循环替换继承而来的值

#### 颜色透明

```css
 color: rgba(r,g,b,a)  a 是alpha  透明的意思  取值范围 0~1之间    color: rgba(0,0,0,0.3)  
```

#### 文字阴影

````css
text-shadow:水平位置 垂直位置 模糊距离 阴影颜色;
````

#### 背景简写

background:背景颜色 背景图片地址 背景平铺 背景滚动 背景位置

```css
background: url(image.jpg) repeat-y  scroll 50% 0 ;
```

#### 背景缩放

a) 可以设置长度单位(px)或百分比（设置百分比时，参照盒子的宽高）

b) 设置为cover时，会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。我们平时用的cover 最多

c) 设置为contain会自动调整缩放比例，保证图片始终完整显示在背景区域

```css
background-image: url('images/gyt.jpg');
			background-size: 300px 100px;
			/* background-size: contain; */
			/* background-size: cover; */
```

#### 多背景

```css
background:url(test1.jpg) no-repeat scroll 10px 20px/50px 60px  ,
	   url(test1.jpg) no-repeat scroll 10px 20px/70px 90px ,
	   url(test1.jpg) no-repeat scroll 10px 20px/110px 130px c #aaa;
```

#### 圆角边框

```css
border-radius: 左上角  右上角  右下角  左下角
```

#### 盒子阴影

```css
box-shadow:水平阴影 垂直阴影 模糊程度 阴影尺寸 阴影颜色  内/外阴影；
```

### 清除浮动的方法

额外标签法

```ht
通过在浮动元素末尾添加一个空的标签例如 <div style=”clear:both”></div>
```

父级添加overflow属性方法

触发BFC机制

#### BFC(**块格式化上下文**)

```
块格式化上下文由以下之一创建：

1.根元素或其它包含它的元素
2.浮动 (元素的float不是none)
3.绝对定位的元素 (元素具有position为absolute或fixed)
4.display属性为下列之一:table-cell,table-caption,inline-block,flex,or inline-flex.
5.块元素具有overflow，且值不是visible

在这些条件里面，用overflow:hidden最合适
第一个作用：
当两个相邻的块级盒子在同一个bfc中时。他们垂直方向上的外边距会发生重叠。解决办法是为其中一个盒子再次触发BFC，使两个盒子分属两个BFC.
第二个作用：
利用BFC阻止文本换行，即破坏文字环绕效果.
第三个作用：
在w3c官方的定义中，BFC仍属于普通流，创建BFC即创建一个独立的盒子，BFC中的浮动元素虽然脱离了文本流但还在此空间内，浮动元素则会撑起父级BFC的高度。
```

用after伪元素清除浮动

```css
 .clearfix:after {  
   content: "."; 
   display: block; 
   height: 0; 
   clear: both; 
   visibility: hidden;  
 }   

 .clearfix {
   *zoom: 1;
 }   /* IE6、7 专有 */
```

## overflow 溢出

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。

visible : 　不剪切内容也不添加滚动条。

auto : 　 超出自动显示滚动条，不超出不显示滚动条

hidden : 　不显示超过对象尺寸的内容，超出的部分隐藏掉

scroll : 　不管超出内容否，总是显示滚动条

## visibility 可见性

设置或检索是否显示对象。

visible : 　对象可视

hidden : 　对象隐藏

特点： 隐藏之后，继续保留原有位置。

## display 显示

display 设置或检索对象是否及如何显示。

display : none 隐藏对象 与它相反的是 display:block 除了转换为块级元素之外，同时还有显示元素的意思。

特点： 隐藏之后，不再保留位置。

#### vertical-align 垂直对齐

:baseline;

:top;

:middle;

#### 一行显示超出带省略号

```css
white-space: nowrap;
/*控制文本强制一行显示*/
text-overflow: ellipsis;
/*超出部分省略显示省略号*/
overflow: hidden;
/*超出隐藏*/
```

### 伸缩布局

1.flex子项目在主轴的缩放比例，不指定flex属性，则不参与伸缩分配

2.flex-direction调整主轴方向（默认为水平方向）

```css
flex-direction: column 垂直排列

flex-direction: row  水平排列

```

3、justify-content调整主轴对齐（水平对齐）

| 值             | 描述                       | 白话文                     |
| ------------- | ------------------------ | ----------------------- |
| flex-start    | 默认值。项目位于容器的开头。           | 让子元素从父容器的开头开始排序但是盒子顺序不变 |
| flex-end      | 项目位于容器的结尾。               | 让子元素从父容器的后面开始排序但是盒子顺序不变 |
| center        | 项目位于容器的中心。               | 让子元素在父容器中间显示            |
| space-between | 项目位于各行之间留有空白的容器内。        | 左右的盒子贴近父盒子，中间的平均分布空白间距  |
| space-around  | 项目位于各行之前、之间、之后都留有空白的容器内。 | 相当于给每个盒子添加了左右margin外边距  |

4、align-items调整侧轴对齐（垂直对齐）

center  项目位于容器的中心。  垂直居中

5、flex-wrap控制是否换行