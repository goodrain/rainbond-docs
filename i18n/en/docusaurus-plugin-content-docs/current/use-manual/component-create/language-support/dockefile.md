---
title: Dockerfile
description: Dockerfile language type Rainbond support specification introduction
---

## Dockerfile type identification strategy

There are `Dockerfile` files in the main code directory, and Rainbond will recognize the code language type as **Dockerfile** . This policy has the highest priority. When the code conforms to other language type identification policies at the same time,**Dockerfile**is still the main one.

## Compilation principle

The source code identified as Dockerfile type will use command similar to `docker build -t xxx/xxx. Docker support).

The build process supports docker multi-stage (multi-stage build) and ARG parameter specification.

## Dockerfile specification

Dockerfile is a script consisting of a series of commands and parameters that are applied to the base image and ultimately create a new image.

Rainbond will read the following parameters defined in the Dockerfile during the source code detection stage

<table spaces-before="0">
<thead>
<tr>
  <th>Parameter Type</th>
  <th>name</th>
  <th>illustrate</th>
</tr>
</thead>
<tbody>
<tr>
  <td>ENV</td>
  <td>environment variable</td>
  <td>Identify the environment variable configuration settable for the service</td>
</tr>
<tr>
  <td>ARG</td>
  <td>build parameters</td>
  <td>Identify the parameter configuration that can be set for the build</td>
</tr>
<tr>
  <td>EXPOSE</td>
  <td>exposed port</td>
  <td>Port configuration identified as a service</td>
</tr>
<tr>
  <td>VOLUME</td>
  <td>persistent storage</td>
  <td>Shared persistent storage configuration identified as a service</td>
</tr>
</tbody>
</table>

<p spaces-before="0">For the definition of Dockerfile, please refer to the official document： <a href="https://docs.docker.com/engine/reference/builder/">https://docs.docker.com/engine/reference/builder/</a></p>

<p spaces-before="0">Here is a use case for Dockerfile to compile and deploy Golang source code：</p>

```bash
FROM muninn/glide:alpine AS build-env
ADD . /go/src/app
WORKDIR /go/src/app
RUN glide install
RUN go build -v -o /go/src/app/app-server

FROM alpine
RUN apk add -U tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY --from=build-env /go/src/app/app-server /usr/ local/bin/app-server
EXPOSE 80
CMD ["app-server"]
```

## full sample code

- [https://github.com/goodrain/dockerfile-demo.git](https://github.com/goodrain/dockerfile-demo.git)

## How to deal with private repositories?

If your Dockerfile uses an image from a private image repository, when you build directly with this Dockerfile, you will not be able to pull the correct image for building due to permission issues.At this point, you can select the authorization information of the mirror warehouse in the team management, fill in the domain name, user name and password of the private mirror warehouse, save it and build it again, and the build will be successful.As shown below:

![private-repo-dockerfile.png](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.8/docs/use-manual/component-create/language-support/private-repo-dockerfile.png)
