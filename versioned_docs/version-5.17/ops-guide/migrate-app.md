---
title: "应用迁移"
description: "介绍如何将旧控制台中部署的应用迁移到新的控制台"
weight: 1001
---

## 概述

本文将介绍如何将业务应用从旧的 Rainbond 环境中迁移到新的 Rainbond 环境中去。

## 前提

- 准备一套新搭建的 Rainbond 环境。（最后一步的备份恢复会覆盖掉新环境，所以新环境中最好不要有业务数据）
- 在新搭建 Rainbond 环境中安装 [grctl](/docs/ops-guide/tools/grctl) 工具。

## 操作流程

### 流程图

<img src="https://static.goodrain.com/docs/remove.jpg" title="迁移流程图"/>

### 流程说明

1. 此时有两个控制台，旧控制台中跑了业务应用，目标是将旧控制台中的应用迁移到新的控制台中去。
2. 在旧控制台中，对接新控制台所管理的集群，旧控制台同时管理两个集群。
3. 通过平台快速复制的方式，将业务复制一份部署到新的集群中，此时新旧集群中各跑了一份业务应用。
4. 同步平台数据，将旧控制台的数据导出后在新的控制台中恢复，让两个控制台保持一样。
5. 如果不需要旧控制台的集群此时便可以在新控制台中删除掉。

### 1. 在旧控制台中对接新控制台的集群

操作步骤：在旧控制台中 `集群` ---> `添加集群` ---> `右上角的 ...` ---> `接入已安装平台集群对接`。  

Region-Config 通过在新集群中执行 `grctl config` 命令获取。

```bash
grctl config
```

<details>
  <summary> Region-Config 示例 </summary>
  <div>

```
apiAddress: https://xxx:8443
ca.pem: |
  -----BEGIN CERTIFICATE-----
  MIIFuTCCA6GgAwIBAgICB+MwDQYJKoZIhvcNAQELBQAwbTELMAkGA1UEBhMCQ04x
  EDAOBgNVBAgTB0JlaWppbmcxEDAOBgNVBAcTB0JlaWppbmcxEDAOBgNVBAkTB0Jl
  aWppbmcxDzANBgNVBBETBjAwMDAwMDEXMBUGA1UEChMOR29vZHJhaW4sIElOQy4w
  IBcNMjMwNjA4MDYzODU0WhgPMjEyMjA2MDgwNjM4NTRaMG0xCzAJBgNVBAYTAkNO
  MRAwDgYDVQQIEwdCZWlqaW5nMRAwDgYDVQQHEwdCZWlqaW5nMRAwDgYDVQQJEwdC
  ZWlqaW5nMQ8wDQYDVQQREwYwMDAwMDAxFzAVBgNVBAoTDkdvb2RyYWluLCBJTkMu
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy9gZohHTqnEgoRHISADh
  qm7F76azcvDzx/yFxOzz8bLf8LQZvKPmdl5lZMKeLTYB9MksUoiy8OtAlcbWA4tl
  1nrwx1kHzZxoyKGYrroxS+J+6UyJOUO+z4L5hzb7B0p5EqTSodeeNQSsJj22tbb9
  PXglA5U5zhrpRAPcmbDH3wCCxofZ5YE5jcBmzsBLSDvpk2Q/v5C7CUbtOfXqK6bQ
  nX1X+Kar8GDuR400aL+Kl3h3KSuzSoY7zb3VpQ1UCw/2CWouhmdD/c8Br0W5oZmk
  uKyeptd3vmE/AXpDDJ1418Oq3SmKD7lRhSMiJICvoWnmJIbQLQduYOezRxZL5IOK
  IQjt8Ywp3i+JypimpELAMgJJQOo6/j7NBAdv6nlBfZG/eeZWLBYr4HqwY4V+0exB
  jbbjmVfzy+ffQI3E+DdvSeaElmCY4YqpHHu8+MoHxlfXIDziBWe+yDJg86iYodI+
  3lLck+5sNyaIdFTxWcc3VxB23PGqxuXI1oSe/X+HyDSdrBMCqQgvwoIKYtFKwNsB
  cFFFgLmVDeixjihNdC6/KHDUU7q/q42gJlMcuGe3LlYfYARCtzS1dzf87MqGyq3n
  NM1YhFZefoo5FOK6etQKo51yoOVUQmtQfv3w97X45mN8oVgg3yNorlMT2e3OKuOe
  W09YGrWdkTzPCPZc9mEqVYnrHOSgOU0YmONsbRtaf8bF4vVu77Hqpya9kg4u1FuZ
  O5Kzl4/uuYzCj9Xz3Bt/7hk7PW3h7fjxwxYIEVp7z1f0+jEn0m+HEX6gxdpfId8M
  MFDWGyDtcVFuCvT4VEoXHi613cPr0Bmuy4U/JxlPzx8pXg4nI9ijdyMlNVNr40if
  aDFfvlq49DWMpV8Roep8q0+6bfAfXUPTTiad22wUre7hKbbDj0EZSJMTUnhD5t9g
  0il1sCRt7cGd3Zg7zzXHwhGbRI/H2kQLFnwouIA=
  -----END CERTIFICATE-----
client.key.pem: |
  -----BEGIN RSA PRIVATE KEY-----
  MIIJKQIBAAKCAgEAwv+dOct3Xjnk3rDs1EPBL2FNhU+IuDn4kud3Pwb+yLVQUgRA
  QfYo6Y+TgrKiMkMVE/h5es3sz7qoEkmA/l9VSG32oZYBQZzdhYX3Xq3FWQajYGe2
  eCDjYk9rHFA9DooVgfqtvhPdLjZPGEQtQd7d/USedAOgmoup3YSvx7VhFHEQk5+F
  kSioPiyy3rgiTrta86Qey/3AU5hEKoYQ5xqdEKsO/IWYAts2NQWjhTb11CN20qrn
  vv7IYccK+bX72hdfbQsI8IZP2e+AQKUHfNrF3MrieFtPzOAk1mInU/V40fmxi3Rr
  HjQ5ic8HuvAxnRAncVQEPFjyYPGecZjHU2L8YUL/sShn3RAFArjYVbZpa8t954DX
  8OUSXOiztcl6dyv+ZEuBpagF8TqcrHkmh1/O9A7HJq3qOYtdYIP5UqHnS/HHKULj
  HMQv/jHpYyO22UMCggEBAOVjwD2ZEI4q5rBi5ThS53unsmnf+k8Eg8yiBAxGdbmW
  w3rGsEvQ5LwAi8cxh32LwgAcfIzwqVKXuDjGS2v/Tbjy9egHclHFNU9zifIhrb5L
  p1aCVxIKVSknUIXqTcikDb++3Sw6kYP7/ZhvtV6tl80uCssIBOPUQgOR0VQpZlQm
  7HgaTZP5VCuCa1zZWS4AJLivIEy3+z8PfIM0nXWw7MF4v3Bhja6te7mOBvyQd/GY
  QAmqYmygyIfdE7YqZzY2h+h/ebNZUNEUuoPtq8cliSA+I6L8uqphlqgfOITOE2lH
  ls13KiCPB8XxPUYFpkkW9wVRhbmwYMK6UdojXtyj10TjoTtzYLaREFcRRrBmpP/X
  zYBac19OJH3iP7lM9Uyc/c5Gh+DxwfKDZQKCAQArmqQ2Fq9b20HapmtxefoSv1S6
  pZtVOMqX81IXU3WZ8HWKrAB7pqGZzqXiRg16IKw8wsHaByxq2VDMHsMSnbUjQIHi
  qkymfAPatZJQbmJaCWWWwrFKXs3NVs8j2Kuf+u6VttYJkmOFNxpOmh554UdWiarJ
  /lPsaexoBZFlvhA+by4eNrBK25N1o9bkMpGRdHSFKRoOWo+0eLu5DKKzRpdxR2k/
  QNFzTwoNNaVBgLl06oDsqm2Q+5eylRLEaPOkixG4+9UuVmZvpUj1kuxi3WCMszFA
  ju3nBDPNodvgxsEIUWGVSPYwVxiM0QUDblaOOMJ8aQAI1EnMeHm3jRRGtfe0
  -----END RSA PRIVATE KEY-----
client.pem: |
  -----BEGIN CERTIFICATE-----
  MIIFtzCCA5+gAwIBAgICB+MwDQYJKoZIhvcNAQELBQAwbTELMAkGA1UEBhMCQ04x
  EDAOBgNVBAgTB0JlaWppbmcxEDAOBgNVBAcTB0JlaWppbmcxEDAOBgNVBAkTB0Jl
  aWppbmcxDzANBgNVBBETBjAwMDAwMDEXMBUGA1UEChMOR29vZHJhaW4sIElOQy4w
  IBcNMjMwNjA4MDYzODU4WhgPMjEyMjA2MDgwNjM4NThaMG0xCzAJBgNVBAYTAkNO
  MRAwDgYDVQQIEwdCZWlqaW5nMRAwDgYDVQQHEwdCZWlqaW5nMRAwDgYDVQQJEwdC
  ZWlqaW5nMQ8wDQYDVQQREwYwMDAwMDAxFzAVBgNVBAoTDkdvb2RyYWluLCBJTkMu
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwv+dOct3Xjnk3rDs1EPB
  L2FNhU+IuDn4kud3Pwb+yLVQUgRAQfYo6Y+TgrKiMkMVE/h5es3sz7qoEkmA/l9V
  SG32oZYBQZzdhYX3Xq3FWQajYGe2eCDjYk9rHFA9DooVgfqtvhPdLjZPGEQtQd7d
  /USedAOgmoup3YSvx7VhFHEQk5+FkSioPiyy3rgiTrta86Qey/3AU5hEKoYQ5xqd
  EKsO/IWYAts2NQWjhTb11CN20qrnvv7IYccK+bX72hdfbQsI8IZP2e+AQKUHfNrF
  G6qZ4HkquOqdcy5k9Qzan4s56In/L1xXOJOS5mLBCXDCcPK+iloWOPE0+nyk9eJm
  MInHCgy8WvB9tzV0nqQjk07BTgGYctuo/pWb7tZKHc3Vc+wV3jKAEWkXhlQWP3Uv
  NRG9PyuMLQB78JQ4N/1vfTOnXBbjw3+nDHNVwKBm7e02j33AE92tuHZhPvKz0CbE
  Djiypyck6EYUSlNqWzuaK5o4lTBKBfERkOUHVHiEY2DkhvCjPwb+gMgkfYRAuZVJ
  y2wd7TMXzMJiTcqQLzTCX2Adph1In9qBRcIb
  -----END CERTIFICATE-----
defaultDomainSuffix: xxx
defaultTCPHost: xxx
websocketAddress: ws://xxx:6060
```

  </div>
</details>

### 2. 应用迁移

1. 在旧控制台中基于新接入集群创建一个团队

2. 进入需要迁移的业务应用视图

3. 快速复制，将应用通过快速复制的方式部署到新的集群中

### 3. 备份旧控制台的平台数据在新控制台中恢复

1. 在旧控制台中 `平台视图` ---> `数据备份` ---> `增加备份` ---> `下载备份`

2. 新控制台中 `平台视图` ---> `数据备份` ---> `上传备份` ---> `恢复备份`

3. 提示重新登录，重新登录即可。

:::danger
注意，如果旧的控制台是快速安装部署，新控制台会显示旧控制台的集群通信异常，这是正常现象，因为之前的集群是跑在 docker 容器中的 k3s ，迁出后连接不到。只需删除掉通信异常的集群删掉即可。
:::


## 下一步

现在你已经成功将应用迁移，接下来你可以尝试：

- [控制台高可用](/docs/installation/install-with-ui/console-recover): 将单机版的控制台也迁移到集群中部署。
- [高可用部署](/docs/installation/install-with-ui/ha): 部署一个高可用集群用于生产环境。
