---
title: GlusterFS基准测试
summary: GlusterFS基准测试
toc: false
asciicast: true
---

<div id="toc"></div>

##一、 GlusterFS基准测试

###1.1 测试环境

|测试环境| |
|---|---|
|操作系统|   CentOS 7.2|
|服务器型号|	PowerEdge R510|
|CPU	| Intel(R) Xeon(R) CPU           X5650  @ 2.67GHz（2颗CPU，每颗6核心，12线程）|
|RAID|	RAID10|
|磁盘|	SAS-HDD 2.0TB X 4     7200rpm|
|RAID卡|	PERC H700
|GlusterFS 版本| 3.10.6|
|存储节点|	2个|
|复制份数|	2|

###1.2 测试工具

fio 测试磁盘性能

- 测试随机写 IOPS，运行以下命令：

```
fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4k -size=1G -numjobs=1 -runtime=1000 -group_reporting -filename=iotest -name=Rand_Write_Testing
```

- 测试随机读 IOPS，运行以下命令：

```
fio -direct=1 -iodepth=128 -rw=randread -ioengine=libaio -bs=4k -size=1G -numjobs=1 -runtime=1000 -group_reporting -filename=iotest -name=Rand_Read_Testing
```

- 测试顺序写吞吐量，运行以下命令：

```
fio -direct=1 -iodepth=64 -rw=write -ioengine=libaio -bs=1024k -size=1G -numjobs=1 -runtime=1000 -group_reporting -filename=iotest -name=Write_PPS_Testing
```

- 测试顺序读吞吐量，运行以下命令： 

```
fio -direct=1 -iodepth=64 -rw=read -ioengine=libaio -bs=1024k -size=1G -numjobs=1 -runtime=1000 -group_reporting -filename=iotest -name=Read_PPS_Testing
```

###1.3 本地磁盘测试


|单次写入大小及策略|测试文件定义大小|随机写io|每秒|iops|运行时间|
|---|---|---|---|---|---|
|4K随机写|1G|1G|3085.2KB/s|771|340s|
|4K随机读|1G|1G|9566.4KB/s|2391|110s|	
|1M顺序写|100G|100G|253803KB/s|247|413s|
|1M顺序读|100G|94G|98340KB/s|96|1000s|	


###1.4 挂载节点测试

|单次写入大小及策略|测试文件定义大小|随机写io|每秒|iops|运行时间|
|---|---|---|---|---|---|
|4K随机写|1G|1G|3006.9KB/s|751|349s|
|4K随机读|1G|1G|2923.2KB/s|730|359s|	
|1M顺序写|100G|100G|259944KB/s|253|403s|
|1M顺序读|100G|100G|252344KB/s|246|416s|	


	
