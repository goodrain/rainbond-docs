---
title: service rate limit
description: This article describes service rate limiting based on the Rainbond platform
---

Rainbond supports envoy-based global rate limiting by default.Presented in the comprehensive network governance plugin provided by Rainbond by default.In this article we present a use case to illustrate the use of global rate limiting in Rainbond.

### precondition

1. Deploy the accessible Demo component one.
2. Enable the integrated network management plug-in for this component.

### Operating procedures

1. To deploy the Redis component that needs to be used for the global restriction service, use the mirror `redis:alpine` to create the component. After the component is created, change the 6379 port alias to `REDIS` in the port settings, and enable `internal services and` permissions.

2. Deploy the global restriction service, and deploy the global restriction service by mirroring.Use the following DockerRun command to create components that can be deployed to the same application in your business.After adding it, make it depend on the REDIS component installed in the previous step.

```
docker run -e USE_STATSD=false -e REDIS_SOCKET_TYPE=tcp -e REDIS_URL=${REDIS_HOST}:${REDIS_PORT} -e RUNTIME_ROOT=/data -e RUNTIME_SUBDIRECTORY=ratelimit -v /data/ -p 8081:8081 barnett/ratelimit:v1.4.0 /bin/ ratelimit
```

After the addition is successful, switch to the component port setting page, open port 8081 for internal services and set the port alias to `RATE_LIMIT_SERVER`

> The global limit service used by default is the default implementation of envoy, and you can customize the implementation according to the API specification of envoy's rate limit service.

3. Add a rate limit profile

Enter the environment management of the global limit service component, add a configuration file, the file path is `/data/ratelimit/config/config.yaml`

```
domain: limit.common
descriptors:
  - key: remote_address
    rate_limit:
      unit: second
      requests_per_unit: 10

  # Black list IP
  - key: remote_address
    value: 50.0.0.5
    rate_limit:
      unit: second
      requests_per_unit: 0
```

Restart the component after adding the configuration file.

> The meaning of this configuration is to limit the rate through the request source IP,`IP` is 50.0.0.5 to limit access, and other IP addresses limit requests to 10 times per second

4. Business component dependencies restrict service components and update plugin configuration

Edit the topology diagram to make the business component depend on the rate limit service component just deployed, then enter the business component plug-in management, and click the view configuration entry of the activated comprehensive management plug-in.In the configuration form, do the following configuration：

- Configure `OPEN_LIMIT` to `yes`
- Configure `LIMIT_DOMAIN` to `limit.common`, which corresponds to the configuration domain in the above configuration file.

After the configuration is complete, update the plugin configuration.

5. Verify that the rate limit is in effect

We can stress test with `ab` command

```
ab -n 1000 -c 20 http://5000.gr425688.duaqtz0k.17f4cc.grapps.cn/
```

The result will be displayed as follows:

```
Concurrency Level: 20
Time taken for tests: 6.132 seconds
Complete requests: 1000
Failed requests: 794
   (Connect: 0, Receive: 0, Length: 794, Exceptions: 0)
Non-2xx responses: 794
```

It can be seen that 794 of 1000 requests are limited, and the access code of the request rejected by the rate limit is `429`

### Reference video

Service request rate limit configuration reference video: https://www.bilibili.com/video/BV1ai4y14718/

### common problem

- Is it possible to customize the development rate limit service

  > Of course, the service implementation used in this article is[envoy ratelimit](https://github.com/envoyproxy/ratelimit.git), and you can implement it yourself based on[API specification](https://github.com/envoyproxy/ratelimit/blob/0ded92a2af8261d43096eba4132e45b99a3b8b14/proto/ratelimit/ratelimit.proto).

- Whether to support more rate limiting policies

  > Rate limiting policies can also support throttling based on request headers, but currently only based on source IP addresses.
