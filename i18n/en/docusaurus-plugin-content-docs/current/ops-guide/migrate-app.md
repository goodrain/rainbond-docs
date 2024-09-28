---
title: Application migration
description: How to migrate applications deployed on the old console to the new console
weight: 1001
---

## General description

This paper will describe how business applications can be migrated from the old Rainbond environment to the new Rainbond environment.

## Prerequisite

- Prepare a new set of Rainbow environments.(Last step backups will overwrite the new environment, so it is better not to have business data in the new environment)
- Install [grctl](/docs/ops-guide/tools/grctl) tools in the newcomer Rainbond environment.

## Operating processes

### Flow chart

<img src="https://static.goodrain.com/docs/remove.jpg" title="迁移流程图"/>

### Process description

1. At this time, there are two consoles, and the old console runs the business application with the aim of migrating the old console app to the new one.
2. In the old console, the old console manages two clusters simultaneously for the cluster managed by the new console.
3. A copy of the business is deployed to a new cluster through rapid replication of the platform, at which time a business application is run in each of the old and new clusters.
4. Sync platform data to restore data from the old console to the new console and keep both consoles.
5. Clusters can be removed from the new console if they do not need the old console at this time.

### Cluster to connect to the new console in the old console

Action step：in the old console `cluster` ---> `Add cluster` ---> `Top Right`...`--->`Access installed platform cluster\`.

Regi-Config is obtained by executing the `grctl config` command in a new cluster.

```bash
grctl config
```

<details>
  <summary> Region-Config Example </summary>
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

### Application migration

1. Create a team based on a new access cluster in the old console

2. Enter the business app view to migrate

3. Quickly copy to deploy to a new cluster by quickly replicating it

### 3) Backup the platform data for the old console to be restored in the new console

1. `Platform view` ---> `Data backup` ---> `Add backup` ---> `Download backup`

2. `Platform view` ---> `Data backup` ---> `Upload backup` ---> `Restore backup`

3. Prompt to log in again to log in.

:::danger
Note that if the old console is deployed quickly, the new console will display a cluster communication exception for the old console, which is normal because the previous cluster was k3s running in the docker container, and will not connect after relocation.Simply delete cluster deletion for communication exceptions.
:::

## Next step

Now that you have successfully migrated, you can try：

- [控制台高可用](/docs/installation/install-with-ui/console-recover): Move the single version of the console console to deploy in the cluster as well.
- [高可用部署](/docs/installation/install-with-ui/ha): Deploy a high available cluster for production environments.
