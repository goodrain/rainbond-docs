---
title: Hystrix组件
summary: 讲解如何搭建Hystrix组件
toc: false
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="spring-cloud.html"><button class="filter-button">1. 概述</button></a>
    <a href="spring-cloud-Eureka.html"><button class="filter-button">2. Eureka组件</button></a>
    <a href="spring-cloud-Hystrix.html"><button class="filter-button current"><strong>3. Hystrix组件</strong></button></a>
    <a href="spring-cloud-Config.html"><button class="filter-button">4. Config组件</button></a>
    <a href="spring-cloud-Zuul.html"><button class="filter-button">5. Zuul组件</button></a>
</div>

<div id="toc"></div>

## 组件介绍

​	在微服务架构中通常会有多个服务层调用，基础服务的故障可能会导致级联故障，进而造成整个系统不可用的情况，这种现象被称为服务雪崩效应。而使用Hystrix(熔断器)就可以避免这种问题。

​	熔断器的原理很简单，如同电力过载保护器。它可以实现快速失败，如果它在一段时间内侦测到许多类似的错误，会强迫其以后的多个调用快速失败，不再访问远程服务器，从而防止应用程序不断地尝试执行可能会失败的操作，使得应用程序继续执行而不用等待修正错误，或者浪费CPU时间去等到长时间的超时产生。熔断器也可以使应用程序能够诊断错误是否已经修正，如果已经修正，应用程序会再次尝试调用操作。

​	当Hystrix Command请求后端服务失败数量超过一定比例(默认50%), 断路器会切换到开路状态(Open). 这时所有请求会直接失败而不会发送到后端服务. 断路器保持在开路状态一段时间后(默认5秒), 自动切换到半开路状态(HALF-OPEN). 这时会判断下一次请求的返回情况, 如果请求成功, 断路器切回闭路状态(CLOSED), 否则重新切换到开路状态(OPEN). Hystrix的断路器就像我们家庭电路中的保险丝, 一旦后端服务不可用, 断路器会直接切断请求链, 避免发送大量无效请求影响系统吞吐量, 并且断路器有自我检测并恢复的能力。


<div align=center>
    <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/hystrix-1.png" width="50%" height="50%">
</div>

## 项目描述

​	通过将Hystrix组件添加到服务消费者，实现熔断效果，只需要在Eureka的demo基础加入Hystrix即可。

<div align=center>
    <img src="https://static.goodrain.com/images/acp/docs/bestpractice/microservice/hystrix-2.png" width="50%" height="50%">
</div>

{{site.data.alerts.callout_danger}}
Hystrix是作用在服务调用端的，因此需要添加在A上。
{{site.data.alerts.end}}

## 部署到云帮

### Hystrix服务

​	因为熔断只是作用在服务调用这一端，因此我们根据上一篇的示例代码只需要改动消费者（A）服务相关代码就可以。因为，Feign中已经依赖了Hystrix所以在maven配置上不用做任何改动。

1、配置文件
application.properties添加这一条：

```
feign.hystrix.enabled=true

```

2、创建回调类

创建HelloRemoteHystrix类继承与HelloRemote实现回调的方法：

```
@Component
public class HelloRemoteHystrix implements HelloRemote{

    @Override
    public String hello(@RequestParam(value = "name") String name) {
        return "hello" +name+", this messge send failed ";
    }
}

```

3、添加fallback属性

在`HelloRemote`类添加指定fallback类，在服务熔断的时候返回fallback类中的内容：

```
@FeignClient(name= "spring-cloud-producer",fallback = HelloRemoteHystrix.class)
public interface HelloRemote {

    @RequestMapping(value = "/hello")
    public String hello(@RequestParam(value = "name") String name);

}

```


4、测试

那我们就来测试一下看看效果吧。

依次启动spring-cloud-eureka、spring-cloud-producer、spring-cloud-consumer三个项目。

浏览器中输入：`http://localhost:9001/hello/neo`

返回：`hello neo，this is first messge`

说明加入熔断相关信息后，不影响正常的访问。接下来我们手动停止spring-cloud-producer项目再次测试：

浏览器中输入：`http://localhost:9001/hello/neo`

返回：`hello neo, this messge send failed`

根据返回结果说明熔断成功。


## 其他微服务架构支持
- [SpringCloud](https://www.rainbond.com/docs/stable/microservice/spring-cloud/spring-cloud.html)
- [Dubbo](https://www.rainbond.com/docs/stable/microservice/dubbo/dubbo-deploy.html)
- [API Gateway(Kong)](https://www.rainbond.com/docs/stable/microservice/kong/kong.html)