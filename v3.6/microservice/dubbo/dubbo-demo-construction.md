---
title: Dubbo Demo结构
summary: Dubbo框架示例的结构
toc: false
toc_not_nested: true
asciicast: true
---
<div class="filters filters-big clearfix">
    <a href="dubbo-overview.html"><button class="filter-button">1.Dubbo概述</button></a>
    <a href="dubbo-demo-construction.html"><button class="filter-button current"><strong>2.Dubbo示例</strong></button></a>
    <a href="dubbo-deploy.html"><button class="filter-button">3.部署到云帮</button></a>
</div>

以一个投票服务为示例介绍Dubbo微服务在云帮平台的最佳实践，以下是服务架构图： 

<img src="https://static.goodrain.com/images/acp/docs/microservice/dubbo/dubbo-demo-construction1.png" width="100%"/>

- User.provider 与 Vote.provider 通过Zookeeper注册服务。
- Vote_web 通过Zookeeper查找服务。
- Vote_web 查找到服务后直接调用User.provider 与 Vote.provider 服务。
- Vote_web、User.provider 与 Vote.provider 服务在构建时通过Maven仓库下载voteservice.jar 文件。
