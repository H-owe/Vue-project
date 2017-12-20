# 对象

### object点方法与中括号方法区别:

1.**中括号法可以用变量作为属性名,而点方法不可以**;

2.**中括号法可以用数字作为属性名,而点语法不可以;**

3.**中括号法可以使用js的关键字和保留字作为属性名,而点语法不可以**     (尽量不要使用关键字和保留字)

#### 遍历对象

1.for（key in obj）

2。Object.keys(对象)

#### http与https协议的区别

https 是安全版的http;

http的链接是简单的,无状态的

https的链接是由ssl+http协议构建的可进行加密传输,身份验证的协议

http连接的端口是80,https连接的端口是443.



#### H5新特性

用于绘画的canvas;

音,视频的video,audio

新标签header,nav,article,section,aside,footer

localstorage,sessionstorage,indexedDB

#### C3新特性

1.文本阴影text-shadow;

2.多背景;

3.边框圆角border-radius

4.盒子阴影box-shadow

5.渐变  线性background-image:linear-gradient   径向渐变 radial-gradient

6.过渡transition

7.透视perspective

8动画@keyframes scale{

from{}

to{}

}

#### JSONP跨域原理

利用在页面中创建 **<script>**节点的src属性不受同源策略的影响 向不同域提交HTTP请求的方法称为JSONP

> 简述原理与过程：首先在客户端注册一个callback, 然后把callback的名字传给服务器。此时，服务器先生成 json 数据。 然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp。最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

缺点:它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

#### CORS跨域

它允许浏览器向跨源服务器，发出[`XMLHttpRequest`](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制。

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）

"预检"请求用的请求方法是`OPTIONS`

在服务器设置Access-Control-Allow-Origin;

### 网络安全

#### SQL(结构查询语言)注入攻击

什么叫做SQL注入？其实就是一种利用一些网站程序员在编写代码的时候，没有对用户输入数据的合法性进行判断从而使应用程序存在的安全隐患，提交一段数据库查询代码，从而获得某些非公开数据的黑客攻击行为。

##### 防御

1.在编码阶段需要对输入进行细致的验证，使用静态查询，如使用参数化声明。且遵循“最小权限准则”，即只赋予应用程序完成其功能的最基本权限。以下是关于最小权限的一些建议：

不要使用root权限访问数据库

为数据表设定限制的可读/可写权限

慎用数据库存储过程

2。在测试阶段采用以下两种方式确保Web应用程序代码的安全性：

第一，采用源代码审核方式，从编程者角度审视代码是否存在漏洞；

第二，执行渗透测试，从攻击者角度检查代码的安全性。

3.在产品化阶段，Web应用程序已经正常上线，并对外提供服务。

这时，可以部署专用的Web应用防火墙（Web Application Firewall，简称WAF），以大幅提升Web应用的安全等级。

#### CSRF攻击

大致原理是：

1. 用户通过浏览器，访问正常网站A（例如某银行），通过用户的身份认证（比如用户名/密码）成功A网站。
2. 网站A产生Cookie信息并返回给用户的浏览器； 
3. 用户保持A网站页面登录状态，在同一浏览器中，打开一个新的TAB页访问恶意网站B；
4. 网站B接收到用户请求后，返回一些攻击性代码，请求A网站的资源（例如转账请求）；
5. 浏览器执行恶意代码，在用户不知情的情况下携带Cookie信息，向网站A发出请求。
6. 网站A根据用户的Cookie信息核实用户身份（此时用户在A网站是已登录状态），A网站会处理该请求，导致来自网站B的恶意请求被执

**防范措施**

**防御CSRF攻击：**

​       目前防御 CSRF 攻击主要有三种策略：验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证。

**（1）验证 HTTP Referer 字段**

​        根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory，用户必须先登陆 bank.example，然后通过点击页面上的按钮来触发转账事件。这时，该转帐请求的 Referer 值就会是转账按钮所在的页面的 URL，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

​        这种方法的显而易见的好处就是简单易行，网站的普通开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。

​        然而，这种方法并非万无一失。Referer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不安全。事实上，对于某些浏览器，比如 IE6 或 FF2，目前已经有一些方法可以篡改 Referer 值。如果 bank.example 网站支持 IE6 浏览器，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。

即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

**（2）在请求地址中添加 token 并验证**

​         CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

​        这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上 <input type=”hidden” name=”csrftoken” value=”tokenvalue”/>，这样就把 token 以参数的形式加入请求了。但是，在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的，并且很容易漏掉，通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。

​         该方法还有一个缺点是难以保证 token 本身的安全。特别是在一些论坛之类支持用户自己发表内容的网站，黑客可以在上面发布自己个人网站的地址。由于系统也会在这个地址后面加上 token，黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。

**（3）在 HTTP 头中自定义属性并验证**

​        这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。

​        然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

#### 什么是闭包

闭包就是能获取其他函数内部变量的函数



### 浏览器渲染一个网页的过程

- 处理 HTML 标记，构建 DOM 树
- 处理 CSS 标记，构建 CSSOM 树
- 将 DOM 树和 CSSOM 树融合成渲染树
- 根据渲染树进行布局，计算每个节点的几何信息
- 在屏幕上绘制各个节点使用CSS“媒体类型”和“媒体查询”优化阻塞渲染的CSS：

#### 优化

http://blog.csdn.net/hailong_546652268/article/details/6410308

使用CSS“媒体类型”和“媒体查询”优化阻塞渲染的CSS：

在script标签里面添加async关键字，其有两个特性：

- 告诉浏览器当它碰到<script>标签时不用阻塞**DOM构建**，因此浏览器会忽略脚本请求，继续解析DOM

- JS执行不依赖CSSOM：如果在CSSOM就绪之前脚本已经就绪，脚本可以立即执行

  腾讯前端规范：

![img](http://img.blog.csdn.net/20150815111155405)

sss
