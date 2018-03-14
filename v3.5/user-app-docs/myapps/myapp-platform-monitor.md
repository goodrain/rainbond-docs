---
title: 监控
summary: 可选择查看应用走势图。
toc: false
---

<div id="toc"></div>

&emsp;&emsp;您可以通过选择实时、1H、8H、24H、7d查看应用走势图。应用支持内存，磁盘，流量的监控，目前MySQL服务与http协议型应用额外包括实时业务监控业务。以MySQL为例，其监控过程如下：

## 实时

选择图中右上角下拉框中的 **实时**

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-monitor1.png" style="border:1px solid #eee;max-width:100%" />

- **SQL平均响应时间**：操作关系到的sql语句响应时间总和/SQL语句数。



- **SQL吞吐率**：吞吐量/运行时间。



- **过去五分钟耗时最多的SQL排行**：统计MySQL运行过去五分钟内执行的SQL语句，以耗时排序并列出SQL语句对应执行累计时间、平均时间、个数。


## 小时

选择图中右上角下拉框中的 **小时**

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-monitor2.png" style="border:1px solid #eee;max-width:100%" />

- **SQL响应时间**：显示过去五分钟内，SQL语句平均响应时间走势图。
- **SQL执行次数**：在MySQL运行期间显示每一分钟SQL语句执行的总次数走势图。
- **内存**：显示内存使用情况。
- **磁盘**：在MySQL运行期间显示磁盘使用情况。
- **流量**：显示流量使用情况。

{{site.data.alerts.callout_success}}监控平台右上角下拉宽可选择其它监控时间范围。{{site.data.alerts.end}}
> Web应用会持续监测以下内容：
> > 五分钟内平局响应时间以走势图显示
>
> > 每一分钟吞吐率以走势图显示
>
> >在线人数以走势图显示
>
> >内存使用情况
>
> >磁盘使用情况
>
> >流量使用情况
#### 

