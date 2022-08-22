---
title: Log connection to ELK system
description: This best practice explains how to connect logs to the ELK system through the plug-in mechanism, which is suitable for developers and application operation and maintenance personnel.
---

This document is suitable for application development and operation and maintenance personnel1 who use and ELK systems **the same time.

The suitable scenario of this document is：Pass the logs of the service components running on Rainbond through`FileBeat log collection plug-in`Connect the ELK system for log collection and analysis.


### Preconditions

- The deployed Nginx sample service component.
- The elasticsearch_kibana application that can be installed with one click through the application market.
- There are`fileBeat log collection plugins in the team and`default plugin.

Taking the collection of Nginx service component logs as an example, through the`fileBeat log collection plugin`, the Nginx access logs and error logs are reported to ElasticSearch and displayed through Kibana.

### Connect ELK

The Nginx component needs to depend on Elasticsearch and Kibana, so that the Nginx component can push logs to ElasticSearch through the default configuration of the`fileBeat log collection plugin`.

> After you depend on other components, you need to update the component for the dependency to take effect.

### Plug-in installation and activation

On the My Plugins page in the team view, select`fileBeat log collection plugin`, and click Install. After the installation is complete, the component can use the plugin.

After the installation is complete, on the plug-in page of the component management page, in the list of`not activated`, find`fileBeat log collection plug-in`, click the button`to activate`on the right to activate the plug-in.After that, the plugin will appear in the list of`opened and`.

### parameter configuration

You can click the`View Configuration`button on the right side of the plug-in to view the configuration parameter information of the plug-in.

| parameter name      | Defaults                  | illustrate             |
| ------------------- | ------------------------- | ---------------------- |
| NGINX_ACCESS_PATH | /var/log/nginx/access.log | access log path        |
| NGINX_ERROR_PATH  | /var/log/nginx/error.log  | error log path         |
| INPUT_PATH          | /var/log/nginx/*.log      | FB log collection path |
| ES_HOST             | 127.0.0.1                 | ES address             |
| ES_PORT             | 9200                      | ES port                |
| ES_USERNAME         | elastic                   | ES username            |
| ES_PASS             | changeme                  | ES password            |
| KIBANA_HOST         | 127.0.0.1                 | KB address             |
| KIBANA_PORT         | 5601                      | KB port                |

> In the plugin's configuration items, all variables already have default values.If necessary, we need to modify it.Among them, the four variables of **ES_HOST, ES_PORT, ES_USERNAME, ES_PASS** define the connection information of Elasticsearch.**KIBANA_HOST, KIBANA_PORT** Specify the connection address of Kibana.The reason why the default can also take effect here is that Nginx already relies on Elasticsearch and Kibana deployed on Rainbond.

### shared storage

The plugin needs to share the log file directory of the component to collect logs, and the log file directory of the component needs to be shared with the plugin.This can be achieved by mounting storage.

**On the storage page of the component management page, add*`temporary storage`*types of storage, and fill in the mount path to the path where the component will generate the log file.Such as `/var/log/nginx`.**

> After hanging on the storage, you need to update and restart the component to make it take effect.

So far, log collection and analysis have been completed through the default plug-in`fileBeat log collection plug-in`to connect to the ELK system. If you find that logs cannot be continuously collected in Kibana, please check whether the operation is correct.

### understand the principle

FileBeat monitors the log output and uploads it to the specified Elasticsearch in a manner similar to `tail -f sth.log`.The service components running on Rainbond can share log files and plugins by persisting the log directory.Through such a mechanism, based on the plug-ins made by FileBeat, the logs of Nginx can be monitored.The configuration in the plugin is to determine the log path and specify the connection address of Elasticsearch and Kibana.

### common problem

- The component does not depend on Elasticsearch and Kibana, resulting in no log collection

  You can choose the Elasticsearch and Kibana installed from the application market on the dependency page of the component management page for dependencies, and restart the update to make it take effect.

- In the plug-in configuration, the ES password does not match, so the log cannot be collected

  You can go to the Elasticsearch component to view its environment variables and confirm the ES password, or view it on the component's dependency page to confirm whether the password matches.Restart the update for it to take effect.

- All dependencies exist, and the plugin configuration is correct, but logs cannot be collected

  You can try restarting the component to confirm that all configurations have taken effect, and then confirm whether the logs are collected successfully.