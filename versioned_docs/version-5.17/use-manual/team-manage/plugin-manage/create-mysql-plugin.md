---
title: MySQL数据库备份与恢复插件
description: 讲解如何使用数据库插件
---

数据库的备份与恢复插件基于 [Percona XtraBackup](https://www.percona.com/software/mysql-database/percona-xtrabackup) 实现，支持 MySQL 数据库物理热备与完全恢复。


对于很多使用Rainbond平台的用户来说，部署应用时不可避免的会使用到Mysql数据库，对于数据库来说，保证数据的可用性是至关重要的，在此基础上，Rainbond官方制作了Mysql数据库的备份及恢复插件。

#### 制作方式

##### 基础工具

Mysql的备份及恢复插件中使用的备份恢复工具为Percona XtraBackup，相关内容可以查看[Percona XtraBackup官方文档](https://www.percona.com/doc/percona-xtrabackup/2.4/index.html)；而在备份插件中使用的定时任务命令为go-cron，插件支持用户自定义配置备份间隔时间，简单说明go-cron如何配置，go-cron支持粒度到秒级别，格式可以参考下方示例，其中星期为可选项，其他五项为必选项

```bash
# ┌───────────── second (0 - 59)
# │ ┌───────────── min (0 - 59)
# │ │ ┌────────────── hour (0 - 23)
# │ │ │ ┌─────────────── day of month (1 - 31)
# │ │ │ │ ┌──────────────── month (1 - 12)
# │ │ │ │ │ ┌───────────────── day of week (0 - 6) (0 to 6 are Sunday to
# │ │ │ │ │ │                 Saturday, or use names; 7 is also Sunday)
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * * command to execute
```

对于go-cron支持字符做出说明，以便用户可以快速使用该插件

| 支持字符 | 功能说明                                                     |
| -------- | ------------------------------------------------------------ |
| *        | 表示匹配所在字段的所有值                                     |
| /        | 表示增长间隔，在第一个字段值为0/3，表示在每分钟的0秒开始，每隔3秒执行一次任务 |
| -        | 表示范围内可以匹配的所有值，在第一个字段值为15-30，表示在每分钟的15-30秒内，每秒执行一次任务 |
| ,        | 表示枚举值，在第一个字段值为“2,15,29”，表示每分钟的2秒，15秒，29秒时都会执行一次任务 |

特别说明一下，```* 3 * * *```表示在每月每天每小时的第3分钟内每秒执行一次任务，```0 3 * * *```则表示在每月每天每小时的第3分钟第0秒时执行一次任务，设置时请务必注意

##### 插件类型

以上为备份恢复插件所使用到的一些基础工具，接下来说明一下Mysql备份插件和Mysql恢复插件插件类型的选择

![image-20200321095608814](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bdl84owj31sg0riwhc.jpg)

Mysql备份插件选择的是一般类型的插件，一般类型的插件和组件一起运行或停止，共享当前组件的网络、持久化的文件以及环境变量等，适用于类似Mysql备份插件一类需要在组件运行时持续执行的任务

![image-20200321100721361](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bp99o1bj31sg0rw775.jpg)

Mysql恢复插件选择的是初始化类型插件，初始化插件不同于其他插件的点在于它是一个一次性的任务，而且必须先于组件运行完成之后，组件才会启动；从Mysql恢复插件我们可以看出在什么情况下适用于初始化插件，Mysql恢复插件中所用到的工具，在执行完任务之后，我们不会再去使用，就没有必要将这些放到组件中去，使用初始化插件无疑可以节省资源以及加强组件的安全性

##### 镜像制作

相关Dockerfile及脚本请参考[Rainbond官方项目](https://github.com/goodrain-apps/percona-xtrabackup.git)的```addone-mysql-backup```和```addone-mysql-restore```分支

###### 备份插件主要流程说明

```bash
if [ "$1" == "bash" ];then
    exec /bin/bash
fi

# installing mysql credentials if file does not exist
mysql_config="/root/.my.cnf"
if [ ! -f "$mysql_config" ]; then
    echo '[xtrabackup]' > /root/.my.cnf
    echo "user=$MYSQL_USER" >> /root/.my.cnf
    echo "password=$MYSQL_PASS" >> /root/.my.cnf
    echo "host=$MYSQL_HOST" >> /root/.my.cnf
    echo "port=$MYSQL_PORT" >> /root/.my.cnf
fi

echo 0 > /tmp/backupnum #清零备份次数

exec go-cron -s "${SCHEDULE:-@every 120s}" -- /bin/bash -c "/bin/backup $BACKUP_TYPE" #定时调用备份脚本
```



```bash
#!/bin/bash
#配置所需环境变量
fullPath="/data/backup/full"
incrPath="/data/backup/incremental"
bakdate=`date +'%F-%H-%M'`
backupNum=`cat /tmp/backupnum`
BakBin="/usr/bin/xtrabackup \
--backup \
--throttle=1"

#创建备份目录路径
[ -d "$fullPath" ] || mkdir -p "$fullPath"
[ -d "$incrPath" ] || mkdir -p "$incrPath"

# 全量备份函数
function hotbackup_full(){
  logfile=$1
  bakpath=$2
  $BakBin --target-dir=$bakpath > $logfile 2>&1
}

# 增量备份函数
function hotbackup_inc(){
  logfile=$1
  bakpath=$2
  backupcycle=$3
  backupnum=$4
  let j=backupcycle+1
  let i=backupnum%j
  if [ "$i" = 0 ]; then
    main "full"
  elif [ "$i" = 1 ]; then
    basefile=`ls $fullPath | grep -v log | sort -r | head -n 1`
    basepath="$fullPath/$basefile"
    $BakBin --target-dir=$bakpath --incremental-basedir $basepath > $logfile 2>&1
  else
    basefile=`ls $incrPath | grep -v log | sort -r | head -n 1`
    basepath="$incrPath/$basefile"
    $BakBin --target-dir=$bakpath --incremental-basedir $basepath > $logfile 2>&1
  fi
}

# 备份状态钉钉提醒
function status(){
  if [ "$1" == 0 ];then
    status_info="Full Backup complete"
    curl 'https://oapi.dingtalk.com/robot/send?access_token='$DINGTOKEN''  -H 'Content-Type: application/json' -d '{"msgtype": "text","text": {"content": "Full Backup complete"}}'
  else
    status_info="Full Backup not complete"
    curl 'https://oapi.dingtalk.com/robot/send?access_token='$DINGTOKEN''  -H 'Content-Type: application/json' -d '{"msgtype": "text","text": {"content": "Full Backup not complete"}}'
  fi
  echo "$status_info -- $DINGTOKEN"
}

#清楚过期备份文件
function clean_timeout_file(){
  find ${fullPath}/ -mtime +$1 -name 2* -exec rm -rf {} \;
  find ${incrPath}/ -mtime +$1 -name 2* -exec rm -rf {} \;
}

# ============= Main =============
#根据输入值判断所需调用函数
function main(){
  BackFile=`ls ${fullPath}/ | grep -v log | wc -l`
  if [ "$BackFile" -ge 2 ];then
    clean_timeout_file $CLEAN_TIME
  fi
  
  if [ "$1" == "full" ];then
    hotbackup_full "${fullPath}/${bakdate}.log" "$fullPath/$bakdate"
    status $? >> ${fullPath}/dd.log
  elif [ "$1" == "incremental" ];then
    hotbackup_inc "${incrPath}/${bakdate}.log" "$incrPath/$bakdate" "$BACKUP_CYCLE" "$2"
    status $? >> ${incrPath}/dd.log
  else
    echo ‘The variable BACKUP_TYPE can be set to "full or incremental"’
  fi
}

# ============= Run ==================
#判断触发值是否合理
if [ ! -z "$BACKUP_ENABLE" -a "$BACKUP_ENABLE" = "true" ];then
  main $1 $backupNum && ((backupNum+=1))
else
  echo ""
fi

echo $backupNum > /tmp/backupnum
```

###### 备份恢复插件主要流程说明

```bash
#!/bin/bash
#设置所需环境变量
fullPath="/data/backup/full"
incrPath="/data/backup/incremental"
FullPreBin="/usr/bin/innobackupex \
--apply-log"
IncPreBin="/usr/bin/innobackupex \
--apply-log \
--redo-only"
ResBin="/usr/bin/innobackupex \
--copy-back \
--datadir=/var/lib/mysql"
fullfile=`ls $fullPath | grep -v log | sort -r | head -n 1`

#确定所需恢复目录列表
function file_list(){
    echo $1 > /tmp/all_back.txt
    ls $incrPath | grep -v log | sort -r >> /tmp/all_back.txt
    cat /tmp/all_back.txt | tr ' ' '\n' | sort | grep -A $BACKUP_CYCLE $1 > /tmp/restore_back.txt
}

#全量备份恢复
function restore_full(){
    $PreBin $1
    $ResBin $1
}

#增量备份恢复
function restore_inc(){
    resfullpath=`sed -nr '1p' /tmp/restore_back.txt`
    $IncPreBin $fullPath/$resfullpath
    if [ "$1" -gt 2 ];then
        sed -r '1d;$d' /tmp/restore_back.txt | while read resincfull ;do
            $IncPreBin $fullPath/$resfullpath --incremental-dir=$incrPath/$resincfull
        done
    fi
    /usr/bin/innobackupex --apply-log $fullPath/$resfullpath --incremental-dir=$incrPath/`sed -nr '$p' /tmp/restore_back.txt`
    $ResBin $fullPath/$resfullpath
}

#主函数，判断需要调用的其他函数
function main(){
    file_list $fullfile
    
    FILE_NUM=`cat /tmp/restore_back.txt | wc -l`

    if [ "$FILE_NUM" -eq 0 ];then 
        status="缺少备份文件，请检查/data/back"
    elif [ "$FILE_NUM" -gt "$BACKUP_CYCLE" ];then
        status="备份文件检测出错，请检查/data/back"
    elif [ "$FILE_NUM" -eq 1 ];then
        restore_full $fullPath/$fullfile $FILE_NUM && status="成功恢复数据" || status="恢复失败，请检查备份文件"
    else 
        restore_inc $FILE_NUM && status="成功恢复数据" || status="恢复失败，请检查备份文件"
    fi

    echo $status
}

#判断触发值是否合理
if [ -z "$BACKUP_CYCLE" -o "$BACKUP_CYCLE" = "0" ];then
    echo "请输入正确的BACKUP_CYCLE"
else
    main
fi
```

###### 镜像制作总结

这二者因为插件类型的不同，再制作镜像时也略有不同，备份插件时启用了定时任务的，会一直处于运行状态，保证了插件本身不会退出；而恢复插件则只是一次性的执行任务，执行完该任务之后，插件本身就会退出，组件和其他类型的插件在此期间一直是Waiting状态的，只有当初始化类型插件执行完之后，才会成为Running状态，在制作初始化插件时需要特别注意这一点

##### 插件制作

Rainbond:5.2版本的插件制作

登录控制台>>进入团队视图>>插件>>新建插件

![image-20200320155800071](https://tva1.sinaimg.cn/large/00831rSTgy1gd0g7uhdynj31z20sc43w.jpg)

###### Mysql备份插件

插件名称：自行命名即可

安装来源：可选镜像或Dockerfile，选择Dockerfile需要提供源码地址、代码版本、启动命令等，由于我已经制作好了镜像，所以选择镜像即可

插件类别：一般类型，原因在上文中已经详细解释

镜像地址：linux2573/xtrabackup:backup

最小内存：自行选择

说明：支持Mysql数据库全量备份，增量备份，超时文件清理，钉钉报警

![image-20200321095619318](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bdrh51cj31sg0riwhc.jpg)

###### Mysql恢复插件

插件名称：自行命名即可

安装来源：可选镜像或Dockerfile，选择Dockerfile需要提供源码地址、代码版本、启动命令等，由于我已经制作好了镜像，所以选择镜像即可

插件类别：初始化类型，原因在上文中已经详细解释

镜像地址：linux2573/xtrabackup:restore

最小内存：自行选择（建议选择128M及以上）

说明：恢复Mysql数据库最近一个备份周期内的数据

![image-20200321100732495](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bpfzj73j31sg0rw775.jpg)

##### 添加配置

插件构建完成后，为了便于使用，需要将可选择的配置项添加出来，方便后续调整

配置说明：

- 配置组名

  该配置组的名称，根据实际情况命名即可

- 依赖元数据类型

  - 不依赖

    不依赖于组件端口

  - 组件端口

    依赖于安装该插件的组件端口

  - 下游组件端口

    依赖于安装该插件的组件的下游组件的端口

- 注入类型

  - 环境变量

    配置项通过环境变量的方式写入插件，插件需要通过环境变量来获取

  - 主动发现

    插件需要调用api主动去获取配置，这种方式适用于动态配置更改

- 配置项

  - 属性名

    配置名称，环境变量名称

  - 协议

    主动发现时api的协议类型

  - 属性类型

    - 字符串

      配置默认值即可

    - 单选

      配置默认值、可选项，默认值为可选项中的一项

    - 多选

      配置默认值、可选项，默认值为可选项中的多项

  - 可修改

    该配置项是否可修改

  - 简要说明

    对配置项做出说明，便于其他人使用

![image-20200320160056290](https://tva1.sinaimg.cn/large/00831rSTgy1gd0gavgzufj31u00u0n11.jpg)

###### Mysql备份插件

配置组名：自行命名

依赖元数据类型：不依赖

注入类型：环境变量

配置项：

| 属性名        | 协议 | 属性类型 | 可选值                           | 可否修改 | 简短说明                                             |
| ------------- | ---- | -------- | -------------------------------- | -------- | ---------------------------------------------------- |
| BACKUP_ENABLE | 无   | 单选     | true,false（默认值为true）       | 可修改   | 是否开启备份                                         |
| BACKUP_TYPE   | 无   | 单选     | full,incremental（默认值为full） | 可修改   | 备份策略为全量备份或增量备份                         |
| SCHEDULE      | 无   | 字符串   | 无（默认值为0 0 3 * *）          | 可修改   | 备份间隔，每隔多久执行一次备份任务                   |
| BACKUP_CYCLE  | 无   | 字符串   | 无（默认值为7）                  | 可修改   | 备份周期，每周期内进行一次全量备份，其余为增量备份   |
| CLEAN_TIME    | 无   | 字符串   | 无（默认值为30）                 | 可修改   | 备份文件保留时间（天），超出该时间的备份文件将被清理 |
| DINGTOKEN     | 无   | 字符串   | 无（默认值为空）                 | 可修改   | 钉钉报警TOKEBN值                                     |

###### Mysql恢复插件

配置组名：自行命名

依赖元数据类型：不依赖

注入类型：环境变量

配置项：

| 属性名       | 协议 | 属性类型 | 可选值          | 可否修改 | 简短说明                                                     |
| ------------ | ---- | -------- | --------------- | -------- | ------------------------------------------------------------ |
| BACKUP_CYCLE | 无   | 字符串   | 无（默认值为7） | 可修改   | 备份周期，用于判断所需恢复文件范围，恢复全量备份时使用默认值即可 |

##### 安装使用

添加完配置项之后就可以使用插件了，下来对这两个插件的使用方式做出说明

###### Mysql备份插件

目前支持Mysql版本为8.0以下，8.0及以上未测试

- 数据库的环境变量或依赖中需要添加一下环境变量```MYSQL_HOST```，```MYSQL_PORT```，```MYSQL_USER```，```MYSQL_PASS```
- 在需要安装插件的组件中开通该组件
- 修改配置项为自己的预期目标，并启用该插件
- 将```/data```目录持久化出来
- 重启组件

###### Mysql恢复插件

恢复数据数据库需要与备份数据数据库版本一致，建议配合Mysql备份插件使用，如果自行使用xtrabackup工具备份，请将备份数据参考Mysql备份插件备份好的数据格式放在相同路径

- 在需要安装插件的组件中开通该组件
- 修改配置项为自己的预期目标，并启用该插件
- 确保```/data```目录有所需数据
- 重启组件
- 数据恢复完成后卸载或停用该插件