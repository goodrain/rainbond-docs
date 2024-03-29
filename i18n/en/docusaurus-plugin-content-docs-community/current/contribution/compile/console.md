---
title: Rainbond console source code compilation
description: Rainbond console source code compilation
---

## Preconditions

- Requires a docker environment

## Business layer code compilation

### Compile the front-end code image

(1) Clone project

```bash
git clone https://github.com/goodrain/rainbond-ui.git
```

(2) Compile the project

`VERSION` specifies the tag of the built image, and the image packaged by the front-end will be used as the base image of the back-end code.

```
VERSION=v5.5.0-release ./build.sh
```

### Source code compilation backend code mirroring

(1) Clone project

```bash
git clone https://github.com/goodrain/rainbond-console.git
```

(2) Compile the project

`VERSION` specifies the tag of the built image. Since the image of the front-end code is the base image, this place should be consistent with the tag of the front-end project.Please use the following commands to compile the front-end and back-end code together to form the final allinone image that can be run directly.

```
VERSION=v5.5.0-release ./release.sh allinone
```

### Run the business layer image

After compiling the allinone image, you can refer to the following command, replace the image name in the last line with the image name you packaged, and run the image.

```bash
docker run -d -p 7070:7070 \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
rainbond/rainbond:v5.5.0-release-allinone
```

After the image is running, access the 7070 port of the machine to enter the Rainbond console.
