---
title: Static HTML
description: Deploy static HTML projects on Rainbond via source code
---

## Overview

The platform identifies it as a static language project by default based on whether there is an `index.html` file in the root directory of the source code.

To customize, please define the `web.conf` configuration file in the root directory of the source code. The default configuration file is as follows:

```conf
server {
  listen       80;
  location / {
      root   /app/www;
      index  index.html index.htm;
  }
}
```

## Deployment Example

Enter the team, create a new application, select **Based on source code example** to build, select `2048 Demo` and default all the next steps.
