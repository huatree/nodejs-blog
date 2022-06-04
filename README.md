---
title: nodejs-blog
date: 2022/05/22 12:37:56
categories:
- 成长经历
tags:
- nodejs
- express
- koa2
- mysql
- redis
- nginx
- docker
- pm2
---

nodejs-blog，一个基于nodejs，从零开发博客的服务端项目总称。技术由浅入深，层层递进。主要包含了blog-native、blog-express、blog-koa2。架构图如下：

![image-20220604103139330](https://huatree.top/image-20220604103139330.png)

## 目录结构

```sh
+-- blog-express # express框架的blog
+-- blog-koa2 # koa2框架的blog
+-- blog-native # 无框架，原生的blog
+-- commonjs # commonjs示例
+-- debugger # debugger调试示例
+-- express # express框架示例
+-- file # 文件读写示例
+-- http # 请求响应示例
+-- koa2 # koa2框架示例
+-- lib # 封装中间件示例
+-- mysql # 使用mysql示例
+-- pm2 # pm2示例
+-- promise # promise示例
+-- redis # 使用redis示例
+-- sql # 数据库表
+-- stream # stream示例
+-- www # 前端静态页面
--- .gitignore # 忽略项
--- package.json
--- README.md
--- yarn.lock
```

`.gitignore`：由VScode plugs `.gitignore Gemerator`提供，并稍作修改：

```sh
# logs
# *.log
```

### 使用

分析目录结构，blog-express、blog-koa2目录有自己的package.json，其他目录有用到依赖的地方，都在根目录package.json下。依赖安装时，切换到对应目录下安装。

仓库的提交历史记录这nodejs-blog从0到1的所有过程，是个不错的学习切入点。

项目用的mysql，redis，nginx由win10下的docker提供支持（该docker安装需要wsl环境）。docker的配置文件`compose.yaml`如下：

```yaml
services:
  mysql:
    image: huatree/mysql:1.0
    container_name: blog-mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    ports:
      - 28000:3306
  redis:
    image: redis:6.2.6
    container_name: blog-redis
    restart: always
    ports:
      - 63790:6379
  nginx:
    image: nginx
    container_name: blog-nginx
    restart: always
    ports:
      - 8082:80
    volumes:
      - ./nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf

```

mysql，可借助官方可视化工具workbench连接验证操作。sql目录下是mysql 8.x数据库表，导入mysql，数据库命名为`huatree_blog`。注意users表中的用户密码，在为加密前注意更改为方便测试使用的密码。默认是字符串`123`加密后存入users表的值。

nginx配置文件`default.conf`修改如下：

```sh
server {
  listen 80;
  listen [::]:80;
  server_name localhost;

  #access_log  /var/log/nginx/host.access.log  main;

  # location / {
  #   root /usr/share/nginx/html;
  #   index index.html index.htm;
  # }

  location / {
    proxy_pass http://192.168.1.12:3000;
    # index index.html
  }

  location /api/ {
    proxy_pass http://192.168.1.12:8081;
    proxy_set_header Host $host;
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  # error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }

  # proxy the PHP scripts to Apache listening on 127.0.0.1:80
  #
  #location ~ \.php$ {
  #    proxy_pass   http://127.0.0.1;
  #}

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  #
  #location ~ \.php$ {
  #    root           html;
  #    fastcgi_pass   127.0.0.1:9000;
  #    fastcgi_index  index.php;
  #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
  #    include        fastcgi_params;
  #}
  # deny access to .htaccess files, if Apache's document root
  # concurs with nginx's one
  #
  #location ~ /\.ht {
  #    deny  all;
  #}
}
```

**注意**：proxy_pass的代理地址，不能用localhost，它指向的是wsl，而不是win10下启动的本地服务地址。listen端口默认80即可，无需改动，因为nginx容器已配置端口如8082，并指向了80。







