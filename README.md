# E-Tickets-Server

电影购票系统 E-tickets 服务端。

---

## 一、服务端架构

* 反向代理： Nginx
* 静态服务器： Nginx
* 动态服务器： Node.js (koa2)

架构如图：

![Server architecture](https://github.com/E-Tickets/Dashboard/blob/master/doc/etickets-server.png?raw=true)

---

## 二、请求

### 2.1 Resources

* image: **[GET] http://server_ip:port/images/xxx.png**

* css: **[GET] http://server_ip:port/css/xxx.css**

* js: **[GET] http://server_ip:port/js/xxx.js**


---

### 2.2 API

* [API 文档](https://e-tickets.github.io/Dashboard/api/api.html)

---

## 三、运行

测试环境：Ubuntu 16.04

### 3.1 配置 Nginx

用仓库中的 nginx.conf 替换默认 nginx.conf 文件。

```
//启动 Nginx 服务器
sudo nginx

//停止 Nginx 服务器
sudo nginx -s stop
```
---

### 3.2 配置数据库

root 进入 mysql 命令行。

```
mysql -u root -p
```

运行 **db_init** 文件夹中所有 .sql 文件。

```
> source /path/xxx.sql
```

---

### 3.3 运行 API 服务器

```
npm install && npm start
```