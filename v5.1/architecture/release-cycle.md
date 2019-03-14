---
title: 版本发布周期
summary: 版本发布周期
toc: true
---
<div class="filters filters-big clearfix">
    <a href="edition.html"><button class="filter-button">功能列表</button></a>
    <a href="roadmap.html"><button class="filter-button ">开发计划</button></a>
    <a href="release-cycle.html"><button class="filter-button current"><strong>发布周期</strong></button></a>
</div>

## 一、版本号规范

版本格式：`A.B.C`


- A : 表示大版本号，一般当软件整体重写，底层组件大版本升级（Docker，Kubernetes）或出现不向后兼容的改变时，增加A
- B : 表示功能更新，出现新功能时增加B
- C : 表示小修改，如修复bug，只要有修改就增加C

----------

<b>版本示例：`3.6.1`</b>
表示，第3个大版本中的第6个功能更新版本，并且在这个功能更新版本中进行了一个版本的bug修复。

## 二、版本更新周期

| 版本类型| 更新周期| 说明|
|-------------|-------------|------------|
| A: 大版本号 | 6~12个月| 版本重构，底层关键组件升级，向后不兼容|
| B: 功能更新版本| 1~3个月| 功能更新|
| C: Bug修复| 1~2周 | Bug或安全补丁|


## 三、当前版本及说明

| 版本号 | 说明 | 
|----------|---------|
| 3.4 | 历史版本，持续修复功能Bug与安全补丁|
| 3.5.2 | 历史版本，持续修复功能Bug与安全补丁|
| 3.6.1 | 历史版本，持续修复功能Bug与安全补丁|
| 3.7.2 | 当前主要生产版本 |
| 5.0.0 | 当前最新版本    |