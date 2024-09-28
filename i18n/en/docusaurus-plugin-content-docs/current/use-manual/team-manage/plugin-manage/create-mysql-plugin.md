---
title: MySQL database backup and restore plugin
description: Explain how to use the database plugin
---

The database backup and recovery plug-in is implemented based on Percona  and supports physical hot backup and full recovery of MySQL database.

For many users who use the Rainbond platform, it is inevitable to use the Mysql database when deploying applications. For the database, it is crucial to ensure the availability of data. On this basis, Rainbond officially made a backup of the Mysql database. and recovery plugin.

#### How to make

##### basic tools

The backup and recovery tool used in the Mysql backup and recovery plug-in is Percona XtraBackup. For related content, please refer to the official document of PerconaThe scheduled task command used in the backup plug-in is go-cron, and the plug-in supports user-defined backup interval configuration. Time, briefly explain how to configure go-cron, go-cron supports granularity down to the second level, the format can refer to the following example, where the week is optional, and the other five are mandatory

```bash
# ┌────────────── second (0 - 59)
# │ ┌───────────── min (0 - 59)
# │ │ ┌─ ────────────── hour (0 - 23)
# │ │ │ ┌──────────────── day of month (1 - 31)
# │ │ │ │ ┌──────────────── month (1 - 12)
# │ │ │ │ │ ┌──────────────── ── day of week (0 - 6) (0 to 6 are Sunday to
# │ │ │ │ │ │ Saturday, or use names; 7 is also Sunday)
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * * command to execute
```

Explain that go-cron supports characters so that users can quickly use the plugin

| Support characters | Function Description                                                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -                  | Indicates all values that match the field                                                                                                                                                           |
| /                  | Indicates the growth interval, the value in the first field is 0/3, which means that the task starts at 0 seconds every minute and executes a task every 3 seconds                                  |
| *                  | Indicates all values that can be matched in the range, and the first field value is 15-30, which means that within 15-30 seconds of every minute, the task is executed every second                 |
| ,                  | Indicates the enumeration value, the value of the first field is "2, 15, 29", which means that a task will be executed every 2 seconds, 15 seconds, and 29 seconds of every minute. |

In particular,`* 3 * * *`means that the task is executed every second in the 3rd minute of every hour of every day of the month, and`0 3 * * *`means that the task is executed at the 0th minute of the 3rd minute of every hour of every day of every month. Execute a task every second, please pay attention when setting

##### Plugin type

The above are some basic tools used by the backup and recovery plug-in. Next, the selection of Mysql backup plug-in and Mysql restore plug-in plug-in type is explained.

![image-20200321095608814](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bdl84owj31sg0riwhc.jpg)

The Mysql backup plug-in selects the general type of plug-in. The general type of plug-in runs or stops together with the component, and shares the network, persistent files and environment variables of the current component. It is suitable for similar Mysql backup plug-ins. ongoing tasks

![image-20200321100721361](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bp99o1bj31sg0rw775.jpg)

The Mysql recovery plug-in selects the initialization type plug-in. The difference between the initialization plug-in and other plug-ins is that it is a one-time task, and the component will not start until it is completed before the component runs; from the Mysql recovery plug-in, we can see that in the Under what circumstances is it applicable to the initialization plug-in, the tools used in the Mysql recovery plug-in, we will not use it again after the task is completed, so there is no need to put these into the component. Using the initialization plug-in can undoubtedly save resources and strengthen component security

##### mirroring

For related Dockerfile and scripts, please refer to[Rainbond official project](https://github.com/goodrain-apps/percona-xtrabackup.git)`addone-mysql-backup`and`addone-mysql-restore`branch

###### Description of the main process of the backup plug-in

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

echo 0 > /tmp/backupnum #Clear the number of backups

exec go -cron -s "${SCHEDULE:-@every 120s}" -- /bin/bash -c "/bin/backup $BACKUP_TYPE" #Call the backup script regularly
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

###### Description of the main process of the backup and restore plug-in

```bash
#!/bin/bash
#Set the required environment variables
fullPath="/data/backup/full"
incrPath="/data/backup/incremental"
FullPreBin="/usr/bin/innobackupex \
--apply -log"
IncPreBin="/usr/bin/innobackupex \
--apply-log \
--redo-only"
ResBin="/usr/bin/innobackupex \
--copy-back \
--datadir =/var/lib/mysql"
fullfile=`ls $fullPath | grep -v log | sort -r | head -n 1`

#Determine the list of required recovery directories
function file_list(){
    echo $1 > /tmp/ all_back.txt
    ls $incrPath | grep -v log | sort -r >> /tmp/all_back.txt
    cat /tmp/all_back.txt | tr ' ' '\n' | sort | grep -A $BACKUP_CYCLE $1 > /tmp/ restore_back.txt
}

#Full backup restore
function restore_full(){
    $PreBin $1
    $ResBin $1
}

#Incremental backup restore
function restore_inc(){
    resfullpath=`sed -nr '1p' /tmp/restore_back .txt`
    $IncPreBin $fullPath/$resfullpath
    if [ "$1" -gt 2 ];then
        sed -r '1d;$d' /tmp/restore_back.txt | while read resincfull ;do
            $IncPreBin $fullPath/$resfullpath --incremental- dir=$incrPath/$resincfull
        done
    fi
    /usr/bin/innobackupex --apply-log $fullPath/$resfullpath --incremental-dir=$incrPath/`sed -nr '$p' /tmp/restore_back.txt`
    $ResBin $fullPath/$resfullpath
}

#Main function, judge other functions that need to be called
function main(){
    file_list $fullfile

    FILE_NUM=`cat /tmp/restore_back.txt | wc -l`

    if [ "$FILE_NUM" -eq 0 ] ;then 
        status="The backup file is missing, please check /data/back"
    elif [ "$FILE_NUM" -gt "$BACKUP_CYCLE" ];then
        status="Backup file detection error, please check /data/back"
    elif [ "$FILE_NUM" -eq 1 ];then
        restore_full $fullPath/$fullfile $FILE_NUM && status="Data restored successfully" || status="Restore failed, please check the backup file"
    else 
        restore_inc $FILE_NUM && status="Data restored successfully " || status="Recovery failed, please check the backup file"
    fi

    echo $status
}

#Determine whether the trigger value is reasonable
if [ -z "$BACKUP_CYCLE" -o "$BACKUP_CYCLE" = "0" ];then
    echo "Please enter the correct BACKUP_CYCLE"
else
    main
fi
```

###### Mirror production summary

Due to the different types of plug-ins, the two are slightly different when re-creating the image. When the scheduled task is enabled when the plug-in is backed up, it will always be running, ensuring that the plug-in itself will not exit; while the restore plug-in is only executed once. task. After the task is executed, the plug-in itself will exit. Components and other types of plug-ins are always in the Waiting state during this period. Only after the initialization type plug-in is executed, will it become the Running state, which is required when making initialization plug-ins. Pay special attention to this

##### Plugin production

Rainbond: Plug-in production for version 5.2

Log in to the console>>Enter the team view>>Plugins>>Create a new plugin

![image-20200320155800071](https://tva1.sinaimg.cn/large/00831rSTgy1gd0g7uhdynj31z20sc43w.jpg)

###### Mysql backup plugin

Plug-in name：can be named by yourself

Installation source：Optional image or Dockerfile. To select Dockerfile, you need to provide the source address, code version, startup command, etc. Since I have already made the image, I can select the image.

Plug-in category：general type, the reasons have been explained in detail above

Image address：linux2573/xtrabackup:backup

Minimum memory：to choose by yourself

Description：Supports full backup of Mysql database, incremental backup, time-out file cleanup, DingTalk alarm

![image-20200321095619318](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bdrh51cj31sg0riwhc.jpg)

###### Mysql recovery plugin

Plug-in name：can be named by yourself

Installation source：Optional image or Dockerfile. To select Dockerfile, you need to provide the source address, code version, startup command, etc. Since I have already made the image, I can select the image.

Plug-in class：initialization type, the reason has been explained in detail above

Image address：linux2573/xtrabackup:restore

Minimum memory：to choose by yourself (recommended to choose 128M and above)

Description：Restore the data in the latest backup cycle of the Mysql database

![image-20200321100732495](https://tva1.sinaimg.cn/large/00831rSTgy1gd1bpfzj73j31sg0rw775.jpg)

##### add configuration

After the plugin is built, for ease of use, you need to add optional configuration items to facilitate subsequent adjustments

Configuration Description：

- Configure group name

  The name of the configuration group can be named according to the actual situation

- Depends on metadata type

  - No Dependencies

    Does not depend on component ports

  - component port

    Depends on the component port on which the plugin is installed

  - Downstream component port

    The port of the downstream component that depends on the component on which the plugin is installed

- injection type

  - environment variable

    Configuration items are written to plugins through environment variables, and plugins need to be obtained through environment variables

  - Active discovery

    The plug-in needs to call the api to actively obtain the configuration, which is suitable for dynamic configuration changes

- configuration item

  - property name

    Configuration name, environment variable name

  - protocol

    The protocol type of the api when actively discovered

  - property type

    - string

      Configure the default value

    - not depend on

      Configure default values, optional items, the default value is one of the optional items

    - Multiple choice

      Configure defaults, optionals, defaults are multiple of optionals

  - Can be modified

    Whether the configuration item can be modified

  - short description

    Describe configuration items for others to use

![image-20200320160056290](https://tva1.sinaimg.cn/large/00831rSTgy1gd0gavgzufj31u00u0n11.jpg)

###### Mysql backup plugin

Configure group name：to name it yourself

Dependent metadata type：is not dependent

inject type：environment variable

Configuration item：

| property name                      | protocol | property type | optional value                                        | Can it be modified | brief introduction                                                                                     |
| ---------------------------------- | -------- | ------------- | ----------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| BACKUP_ENABLE | none     | radio         | true,false (default is true)       | Can be modified    | Whether to enable backup                                                                               |
| BACKUP_TYPE   | none     | radio         | full,incremental (default is full) | Can be modified    | The backup strategy is full backup or incremental backup                                               |
| SCHEDULE                           | none     | string        | None (default is 0 0 3 \* \*)      | Can be modified    | Backup interval, how often to perform backup tasks                                                     |
| BACKUP_CYCLE  | none     | string        | None (default is 7)                | Can be modified    | Backup cycle, a full backup is performed every cycle, and the rest are incremental backups             |
| PLAYLIST_TIME | none     | string        | None (default is 30)               | Can be modified    | Backup file retention time (days), backup files beyond this time will be cleaned up |
| DINGTOKEN                          | none     | string        | None (default is empty)            | Can be modified    | Dingding alarm TOKEBN value                                                                            |

###### Mysql recovery plugin

Configure group name：to name it yourself

Dependent metadata type：is not dependent

inject type：environment variable

Configuration item：

| property name                     | protocol | property type | optional value                         | Can it be modified | short description                                                                                                                                        |
| --------------------------------- | -------- | ------------- | -------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BACKUP_CYCLE | none     | string        | None (default is 7) | Can be modified    | The backup cycle is used to determine the range of files to be restored, and the default value can be used when restoring a full backup. |

##### Install and use

After adding the configuration items, you can use the plug-in. Let's explain how to use these two plug-ins.

###### Mysql backup plugin

Currently supported Mysql version is below 8.0, 8.0 and above have not been tested

- The environment variables or dependencies of the database need to be added to the environment variables`MYSQL_HOST`,`MYSQL_PORT`,`MYSQL_USER`,`MYSQL_PASS`
- Activate the component in the component that needs to install the plug-in
- Modify the configuration item to your desired target and enable the plugin
- Persist the`/data`directory
- Restart components

###### Mysql recovery plugin

The version of the restored data database needs to be the same as that of the backup data database. It is recommended to use it with the Mysql backup plug-in. If you use the xtrabackup tool to backup by yourself, please refer to the backup data format of the Mysql backup plug-in and put it in the same path.

- Activate the component in the component that needs to install the plug-in
- Modify the configuration item to your desired target and enable the plugin
- Make sure the`/data`directory has the required data
- Restart components
- Uninstall or disable the plugin after data recovery is complete
