# gulp-nocache

重命名所有静态资源，并替换相应的引用路径，用于解决web上线后浏览器缓存静态资源的问题。[Web-NoCache](https://github.com/Javey/nocache)

## Install

```
npm install gulp-nocache
```

## Usage

[gulpfile.js](https://github.com/Javey/gulp-nocache/blob/master/test/gulpfile.js)示例

### Input

```
./web
├── edit.png
├── index.html
├── index.js
├── main.css
└── main.js
```

### Output

```
./build
├── edit.bf460a.png
├── index.0060a9.js
├── index.html
├── main.01cb6e.css
└── main.9968bc.js
```

index.html

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>test web</title>
    <link rel="stylesheet" type="text/css" href="main.01cb6e.css">
</head>
<body>
<h1>TEST</h1>
<script type="text/javascript" src="main.9968bc.js"></script>
<script type="text/javascript" src="/index.0060a9.js"></script>
</body>
</html>
```

#API

##getMap

返回处理前后文件路径对应关系的map

##setMap(value)

设置处理前后文件路径对应关系的map