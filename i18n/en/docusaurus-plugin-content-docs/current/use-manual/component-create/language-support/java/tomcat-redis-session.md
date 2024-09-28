---
title: Tomcat configures Redis to implement Session sharing
description: how-to-use-rainbond
---

In order to make your app more integrated and more stable, you need to expand it in appropriate circumstances.In order to make your application withstand more concurrency and improve application stability, you need to expand the capacity when appropriate.Tomcat under each node only stores the session generated when accessing its own request. In order to solve the problem of session persistence after expansion, we provide **Java War package project using Tomcat to configure Redis to achieve session sharing** solution, share your session Stored in redis to ensure the stability of your application.

If you use **source code to deploy Java projects, you can configure redis to achieve session sharing**in the following two ways:

### Use Webapp-Runner or Jetty-Runner

Rainbond uses [webapp-Runner](./webapp-runner) embedded tomcat or jetty-Runner embedded jetty to implement server functions.Applications can be easily deployed on Rainbond without you needing to create additional servers.The following steps can be used to achieve **configure redis to achieve session sharing**.You can easily deploy the app to Rainbond, without creating another server.The **Configure Redis to implement session sharing** can be implemented by the following steps.

1. Configuration [Procfile](../procfile)：Add the following commands to your Procfile, and add Procfile to the source root directory.

   ```
   web: java -jar ./webapp-runner.jar --port $PORT --session-store redis ./*.war
   ```

   - The listening port is specified, and by obtaining the environment variable \$PORT, this variable Rainbond performs automatic injection according to the service port set by the platform
   - Specify session store`--session-store redis`

2. Install the Redis service from the application market, and set the current service to depend on the created Redis service, refer to document [Communication between components](/docs/micro-service/service-mesh/regist_and_discover)

3. The application configuration redis：adds`REDIS_URL`to the application environment variable, and the value is `redis://:${REDIS_PASS}@127.0.0.1:6379`.

4. Restart the app to adapt

### Using docker images

Rainbond provides a way to start an application using a custom tomcat container.The following steps can be used to achieve **configure redis to achieve session sharing**.The **Configure Redis to implement session sharing** can be implemented by the following steps.

1. Create a Dockerfile and write the following content：

   - use source code

```dockerfile
FROM goodrainapps/tomcat:7.0.82-jre7-alpine
RUN rm /usr/local/tomcat/webapps/ROOT
COPY <dir_name> /usr/local/tomcat/webapps/ROOT #<dir_name>is the source directory name
EXPOSE 8080
```

- use war package

```dockerfile
FROM foodrainpps/tomcat:7.0.82-jre7-alpine
RUN rm /usr/local/tomcat/webapps/ROOT
COPY <filename>.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080
```

2. Confirm that`<dir_name>`or`<filename>.war`of the source code exists, and it exists in the same directory as the Dockerfile file, and this directory is the root directory to start creating components
3. Install Redis service and establish dependencies, refer to document [Communication between components](/docs/micro-service/service-mesh/regist_and_discover)
4. The application configures the redis：configuration variable`REDIS_URL`to the application environment variable with the value `127.0.0.1:6379`; the configuration variable`REDIS_SESSION`to the application environment variable, the value is`true`.
5. Restart the app to adapt
