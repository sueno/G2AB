使用方法
---
プラグインの追加　＞　フリープラグインに以下を記述

```
<script src="http://www.google.com/jsapi"></script>
<script>google.load('jquery','1')</script>
<script>(function(j){j(function(){$=jQuery=j})})($)</script>
<script src="https://raw.github.com/sueno/G2AB/master/g2ab.js"></script>
```

ブログでGistのソースコードを貼り付けたいところに，以下を記述

```
<div class="amebloGist" id="貼り付けたいGistソースコードの番号(urlの数字部分)"></div>
```

example:

```
<div class="amebloGist" id="0000000"></div>
```