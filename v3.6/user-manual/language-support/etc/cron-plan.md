---
title: Cron计划任务
summary: Cron计划任务
toc: false
---
<div id="toc"></div>
&emsp;&emsp;云帮应用的计划任务功能目前处于beta阶段，完全兼容crontab的计划任务格式。本文介绍的内容可能在以后的产品升级中废除或改进，但已经部署的计划任务应用不会受到影响。
## 实现原理
云帮的计划任务应用和传统的Linux计划任务实现是一致的，同样使用 crontab 格式的文件，配合cron程序来执行特定的任务。同样与代码部署的逻辑一致，只需要将crontab 格式的计划任务文件放在代码跟目录即可。
<center><img src="https://static.goodrain.com/images/acp/docs/code-docs/lang-etc-cron-plan.png" style="border:1px solid #eee;max-width:70%"></center>

## 配置crontab格式的文件

### 计划任务格式

```bash
# 每三分钟在标准输出打印hello world
*/3 * * * * echo "hello world"   >> /data/cron.log 2>&1
```

{{site.data.alerts.callout_danger}}cron的标准输出不会直接输出，因此这里将计划任务的输出重定向到日志文件中，后续通过Procfile可以将日志送到标准输出。{{site.data.alerts.end}}

#### 格式解释

| 代表含义 | 分钟   | 小时   | 日期   | 月份   | 周    | 命令   |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 数字范围 | 0-59 | 0-23 | 1-31 | 1-12 | 0-7  | 运行命令 |

看一下第五个星号，它代表的是星期几，这里需要注意一下，0和7都代表的是星期日，另外还有一些辅助的字符如下：

| 特殊字符   | 代表含义                                     |
| ------ | ---------------------------------------- |
| *(星号)  | 代表任何时刻都接受的意思！举例来说 1 command 意思是说无论哪年哪月哪日每个小时的第一分钟执行这个命令 |
| ,(逗号)  | 代表分隔時段的意思。如下例子，如果要在3点和6点执行命令：0 3,6 * command时间参数是五列，第二列的3,6代表3点和6点 |
| -(减号)  | 代表一段時間范围内，如 8 点到 12 点之间的每小时的 20 分都运行一次命令：20 8-12 * command第二列变成了 8-12 ！代表 8,9,10,11,12 都适用的意思 |
| /n(斜杠) | 那个 n 代表数字，亦即是『每隔 n 单位间隔』的意思，例如每五分钟执行一次，则：/5 command用 与 /5 來搭配，也可以写成 0-59/5 ，意思一样 |

## 计划任务配置

### 代码结构

```bash
＃ 代码结构
├── cron.txt
├── index.html
└── Procfile

#  cron.txt 文件内容
*/3 * * * * echo "hello world！" >> /data/cron.log 2>&1

# Procfile文件内容
web: crontab www/cron.txt && cron && touch /data/app.log && tail -f /data/app.log
```

{{site.data.alerts.callout_danger}}
- 目前好雨云没有针对计划任务分离单独的应用类型，因此需要用户针对自己的需求将计划任务定义一个语言类型。如果您只需要执行一些shell脚本，可以直接在代码中添加index.html让平台认为是一个html代码，从而可以让平台识别代码并构建环境。如果是其它语言，请按照相应的语言监测规则匹配即可。
- Procfile中不运行web server，则应用的访问 按钮指向的连接无效。

针对不同的语言示例会在本文下面的demo中给出链接地址
{{site.data.alerts.end}}

## Procfile

计划任务的Procfile文件分三部分：

- web 应用类型 平台目前仍然使用web类型最为计划任务应用，后续会变更。
- crontab cron.txt 利用crontab 命令将cron.txt 这个计划任务加载到计划任务列表中。
- cron -f 使用前台的形式 运行 cron 服务

## Cron 示例代码

- [php环境的计划任务](http://code.goodrain.com/demo/cron-php/tree/master)

> 这个demo做了2件事：
>
> 1. 配置一个计划任务，每3分钟往 /tmp/test.txt 文件中写入时间
> 2. 配置了一个php环境且运行了一个web server 可以看到/tmp/test.txt 的内容

- [cron并显示日志输出](http://code.goodrain.com/demo/cron-shell/tree/master)