---
title: Spring Boot框架配置MySQL
summary: spring boot mysql demo
toc: false
---
<div id="toc"></div>

Spring Boot框架简化了新Spring应用的初始搭建以及开发过程，云帮支持平台部署Spring Boot类应用。

云帮提供Spring Boot配置MySQL服务的示例，去[云市](http://app-test.goodrain.com)一键式部署[Spring Boot-MySQL示例]()

您可以通过如下配置自行创建建Spring Boot实例

## 创建示例

使用spring-boot-cli创建示例

```bash
$ docker run -it --rm \
-v $PWD:/app goodrainapps/spring-boot-cli:1.5.9 spring init --dependencies=web spring-boot-mysql-demo
```

进入示例类文件存放目录

```Bash
$ cd spring-boot-mysql-demo/src/main/java/com/example/springbootmysqldemo
```

添加DemoApplication.java

{% include copy-clipboard.html %}

```java
@Controller
@SpringBootApplication
public class DemoApplication {

        @RequestMapping("/")
        @ResponseBody
        String home() {
                return "Hello World!";
        }

        public static void main(String[] args) {
                SpringApplication.run(DemoApplication.class, args);
        }
}
```

### 构建示例

为了加快maven构建，在`setting.xml`中添加了国内的mirror。将`setting.xml`拷贝到您的`spring-boot-mysql-demo`中。

```bash
$ cd spring-boot-mysql-demo
$ docker run -it --rm \
-v "$PWD":/app/build \
-w /app/build maven:3.5.2-jdk-7-alpine mvn -B -DskipTests=true -s settings.xml clean install
```

### 运行

执行以下命令运行`Hello World` 示例

```bash
$ cd spring-boot-mysql-demo
$ docker run -it --rm -v $PWD:/app -w /app -p 8080:8080  goodrainapps/openjdk:8u131-jre-alpine java  -jar target/*.jar
```

{{site.data.alerts.callout_success}}

访问[http://localhost:8080](http://localhost:8080)查看运行结果。

{{site.data.alerts.end}}

## 配置数据库

云帮提供Spring-boot-mysql-demo的相关配置目录结构如下，配置文件内容仅供参考。

<img src="https://static.goodrain.com/images/acp/docs/code-docs/java/spring-boot-demo1.png" width="30%" />

详细配置参考下文：

### 连接MySQL

添加以下内容，将此应用与数据库进行连接。

在`pom.xml`内添mysql数据库服务 ：

{% include copy-clipboard.html %}

```xml
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <version>5.1.9</version>
</dependency>
```

添加JDBC驱动：

{% include copy-clipboard.html %}

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

在`application.properties`添加数据库连接信息：

{% include copy-clipboard.html %}

```properties
spring.datasource.url=jdbc:mysql://${MYSQL_HOST}:${MSYQL_PORT}/demo?createDatabaseIfNotExist=true
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASS}
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.maxActive=10
spring.datasource.maxIdle=5
spring.datasource.minIdle=2
spring.datasource.initialSize=5
spring.datasource.removeAbandoned=true
```

在源码添加`DatabaseConfig.java`

{% include copy-clipboard.html %}

```java
@Configuration
public class DatabaseConfig {
    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return new org.apache.tomcat.jdbc.pool.DataSource();
    }
}
```

### 数据库初始化

使用 [JPA](http://www.jpa.gov.my/) 管理生成实体的映射关系的代码。

{% include copy-clipboard.html %}

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency
```

### 数据库重构与迁移

使用[LiquiBase](http://www.liquibase.org/index.html)，以便将JPA生成实体的映射关系在数据库体现。第一步，在`pom.xml`添加：

{% include copy-clipboard.html %}

```xml
<dependency>
   <groupId>org.liquibase</groupId>
   <artifactId>liquibase-core</artifactId>
   <version>3.4.1</version>
</dependency>
```

第二步，创建 Liquibase 的修改日志,默认从 `db.changelog-master.yaml` 读取：

{% include copy-clipboard.html %}

```yaml
databaseChangeLog:
  - changeSet:
      id: 1
      author: <your_name>
      changes:
        - createTable:
            tableName: person
            columns:
              - column:
                  name: id
                  type: int
                  autoIncrement: true
                  constraints:						
                    primaryKey: true
                    nullable: false
              - column:
                  name: first_name
                  type: varchar(255)
                  constraints:
                    nullable: false
              - column:
                  name: last_name
                  type: varchar(255)
                  constraints:
                    nullable: false
```

## 模板渲染

Thymeleaf可以帮助渲染`XML`、`XHTML`、`HTML5`内容的模板引擎，它也可以轻易的与`Spring MVC`等Web框架集成作为Web应用的模板引擎。在`pom.xml`中添加：

{% include copy-clipboard.html %}

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## docker化改造

为了支持 Spring Boot MySQL demo 轻松部署在云帮，将demo使用Dockerfile构建镜像，在云帮实现一键式部署

{% include copy-clipboard.html %}

```dockerfile
#使用配置好环境的父镜像
FROM maven:3.5.2-jdk-7-alpine
#创建demo源码工作目录
RUN mkdir /app
#将本地源码拷贝到镜像中
COPY . /app/
#指定工作目录
WORKDIR /app
#声明映射端口
EXPOSE 5000
#指定maven的配置文件，文件内制定新的mirror地址
RUN mvn -s settings.xml -B -DskipTests=true clean install
#启动脚本
ENTRYPOINT ["/app/run.sh"]
```

### 构建镜像

```Bash
$ docker build -t goodrainapps/spring-boot-mysql-demo .
```

### 运行

```bash
#运行mysql
$ docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=123456 mysql
```

```bash
#运行示例
$ docker run -it --rm --link mysql \
  -p 5000:5000 \
  -e MYSQL_HOST=mysql \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASS=123456 \
  goodrainapps/spring-boot-mysql-demo
```

{{site.data.alerts.callout_success}}

访问[http://localhost:5000](http://localhost:5000)查看Spring Boot 框架配置MySQL服务的运行界面

<img src="https://static.goodrain.com/images/acp/docs/code-docs/java/spring-boot-demo2.png" width="50%"/>

{{site.data.alerts.end}}

