---
title: 告警
summary: 监控告警
toc: true
---

### 一：简介

你当然不希望自己的机器与服务由于各种原因引发异常。而你不能一天二十四小时去关注各方面的数据指标。所以自定的监控报警是非常有必要性的。使用监控报警机制，当监控数据触发你制定的报警规则后，可以自动触发报警并将信息发送至你的接收端。这对系统的稳定性是非常有帮助的。

使用[Prometheus](https://prometheus.io/)进行警报分为两部分。Prometheus服务器中的警报规则会向Alertmanager发送警报。然后，[Alertmanager](https://prometheus.io/docs/alerting/alertmanager) 管理这些警报，包括静音，禁止，聚合以及通过电子邮件，PagerDuty和HipChat等方法发送通知。

设置警报和通知的主要步骤如下：

- [安装](https://github.com/prometheus/alertmanager)并[配置](https://prometheus.io/docs/alerting/configuration) Alertmanager
- [配置Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#%3Calertmanager_config)与Alertmanager通信
- 在Prometheus创建[警报规则](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)



### 二：安装配置Alertmanager

##### 2.1 安装Alertmanager 

可在github下载源码编译二进制文件执行

```
$ mkdir -p $GOPATH/src/github.com/prometheus
$ cd $GOPATH/src/github.com/prometheus
$ git clone https://github.com/prometheus/alertmanager.git
$ cd alertmanager
$ make build
$ ./alertmanager --config.file=<your_file>
```

DockerHub 地址https://hub.docker.com/r/prom/alertmanager/

具体安装细节可参阅[官方文档](https://github.com/prometheus/alertmanager)

##### 2.2 配置

指定要加载的配置文件，使用`--config.file`参数指定配置文件，配置文件格式为YAML格式编写。

要查看所有可用的命令行flag，运行alertmanager -h。

```
./alertmanager --config.file=simple.yml
```

详细的配置项说明及示例你可以参阅此[文档](https://prometheus.io/docs/alerting/configuration/)。



### 三：配置Prometheus与Alertmanager进行通信

当Alertmanager启动后，会默认监听`9093`端口，并通过HTTP协议的POST请求接收来自Prometheus触发报警规则的信息。所以需要告诉Prometheus，Alertmanager服务的地址。将Alertmanager服务的地址与端口配置在Prometheus的`ConfigMap`的`alerting`一项中。

在Prometheus的配置文件中增加Alertmanager的配置：

```yaml
alerting:
  alertmanagers:
    - static_configs:
      - targets: ["localhost:9093"]
```

> 在Rainbond中你可以在服务配置文件`/opt/rainbond/conf/manager-services.yaml`中找到`rbd-monitor`服务，在启动参数中使用`--alertmanager-address=localhost:9093`配置Alertmanager地址，如果有多个可用逗号分隔。重启monitor服务时，会将该参数解析出来替换到Pormetheus的`ConfigMap`中并启动，Pormetheus会通过HTTP与Alertmanager在API端点`/api/v1/alerts`处侦听Pormetheus发送来的警报。

### 四：在Prometheus创建警报规则

##### 4.1 在Prometheus ConfigMap中添加定义规则的文件

Prometheus的警告规则定义在固定格式的yaml文件中，并将此文件的路径配置在Prometheus`ConfigMap`的`rule_files`一栏中。`rule_files` 主要用于配置 rules 文件，它支持多个文件以及文件目录。

rule_files代码结构定义为：

```
RuleFiles      []string        `yaml:"rule_files,omitempty"`
```

配置文件结构大致为：

```yaml
rule_files:
  - "rules/node.rules"
  - "rules2/*.rules"
```

##### 4.2 定义报警规则的结构与格式

警告规则配置文件结构大致为：

```yaml
groups:
  [ - <rule_group> ]
```

<rule_group>:

```yaml
# The name of the group. Must be unique within a file.
name: <string>

# How often rules in the group are evaluated.
[ interval: <duration> | default = global.evaluation_interval ]

rules:
  [ - <rule> ... ]
```

<rule>:

```yaml
# The name of the alert. Must be a valid metric name.
alert: <string>

# The PromQL expression to evaluate. Every evaluation cycle this is
# evaluated at the current time, and all resultant time series become
# pending/firing alerts.
expr: <string>

# Alerts are considered firing once they have been returned for this long.
# Alerts which have not yet fired for long enough are considered pending.
[ for: <duration> | default = 0s ]

# Labels to add or overwrite for each alert.
labels:
  [ <labelname>: <tmpl_string> ]

# Annotations to add to each alert.
annotations:
  [ <labelname>: <tmpl_string> ]
```

##### 4.3 添加了一些默认的报警规则

我们默认为你添加了一些报警规则，可以在Prometheus WEB界面的`Alerts`一栏中看到这些报警规则。主要是一些服务的健康监控，Node资源的使用等，如果不需要或者需要更改，使用`grctl`工具重新自定义你的报警规则即可。

##### 4.4 使用grctl自定义警告规则

我们把自定义规则的最小单位定义为`<rule_group>`，每个规则组有自己唯一的name，一组中可以定义多个`alert: <string>`。每个`alert: <string>`都是一个报警规则配置。

当Prometheus启动时，会在启动配置中添加`rule_files`的路径，并使用结构体初始化默认的警告规则，序列化成yml文件格式生成rule_files文件，Prometheus启动后就可以读取该文件中定义的所有警告规则。

为了简单快速的自定义警告规则，可以通过`grctl`命令行工具对Prometheus的警告规则进行增删改查。操作的单位为一个`rule_group`。在增加编辑一组规则时，你需要将自定义的警告规则按正确格式定义在yml文件中，并将文件路径以参数的方式传递给grctl。系统读取原有的`rule_files`并将内容反序列化成结构体，再读取自定义规则的yml文件，反序列化成结构体添加至警告规则的结构体中，将结构体重新生产yml文件，重新Prometheus，则会重新读取`rule_files`中的所有警告规则。

当删除或查询某一个`<rule_group>`时，读取`rule_files`，根据name查找到或删除这一组规则，然后再生成`rule_files`，重启Prometheus，重新读取`rule_files`，加载警告规则。

* 获取规则列表

`grctl alerting list`

* 获取某一组规则

`grctl alerting get <name>` name 参数是你要获取某一组规则的组名。

> 例如:
>
> `gectl alerting get NodeHealth`  得到结果

```yaml
name: NodeHealth
rules:
- alert: high_cpu_usage_on_node
  annotations:
    description: '{{ $labels.instance }} is using a LOT of CPU. CPU usage is {{ humanize
      $value}}%.'
    summary: HIGH CPU USAGE WARNING ON '{{ $labels.instance }}'
  expr: sum by(instance) (rate(process_cpu_seconds_total[5m])) * 100 > 70
  for: 5m
  labels:
    service: node_cpu
- alert: high_la_usage_on_node
  annotations:
    description: '{{ $labels.instance }} has a high load average. Load Average 5m
      is {{ humanize $value}}.'
    summary: HIGH LOAD AVERAGE WARNING ON '{{ $labels.instance }}'
  expr: node_load5 > 5
  for: 5m
  labels:
    service: node_load5
```

* 添加一组规则

`grctl alerting add <path>` path参数是要一个yml格式的文件地址， 在该文件中要使用正确的格式编写规则，`自定义规则的格式如下，请务必保证格式及参数正确`。一组规则可以添加多个alert。

> 示例

./rule.yml

```yaml
name: NodeHealth
rules:
- alert: high_cpu_usage_on_node
  annotations:
    description: '{{ $labels.instance }} is using a LOT of CPU. CPU usage is {{ humanize
      $value}}%.'
    summary: HIGH CPU USAGE WARNING ON '{{ $labels.instance }}'
  expr: sum by(instance) (rate(process_cpu_seconds_total[5m])) * 100 > 70
  for: 5m
  labels:
    service: node_cpu
```

执行命令

`gectl alerting add ./rule.yml`

* 删除一组规则

`grctl alerting del <name>` name为要删除规则的组名

* 修改一组规则

`grctl alerting modify -rn <name> -rp <path>` name为要修改规则的组名，path为要修改规则的文件路径。规则的格式同添加规则的一样。

* 规则格式及参数说明

```yaml
name: NodeHealth
rules:
- alert: high_cpu_usage_on_node
  annotations:
    description: '{{ $labels.instance }} is using a LOT of CPU. CPU usage is {{ humanize
      $value}}%.'
    summary: HIGH CPU USAGE WARNING ON '{{ $labels.instance }}'
  expr: sum by(instance) (rate(process_cpu_seconds_total[5m])) * 100 > 70
  for: 5m
  labels:
    service: node_cpu
```

* 内容格式必须为yml文件格式。
* name： 是这组规则的组名，可以用这个组名来查询、修改、删除一组规则。
* alert：报警名称。
* expr：Prometheus的查询语句，当符合这个语句的条件时触发报警。
* for：子句使得Prometheus等待第一个传进来的向量元素（例如高Alert1错误的实例），并计数一个警报。如果元素是active，但是没有firing的，就处于pending状态。通俗的讲就是出现异常的时间达到设置时长就发送报警信息。
* labels：（标签）key:values的格式，子句允许指定一组附加的标签附到警报上。现有的任何标签都会被覆盖，标签值可以被模板化。
* annotations：（注释）key:values的格式，子句指定另一组未查明警报实例的标签，它们被用于存储更长的其他信息，例如警报描述或者链接，注释值可以被模板化。
* 一组规则里可以添加多个alert。