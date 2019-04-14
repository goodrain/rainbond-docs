---
Title: "Maven 多模块源码构建"
Description: "Rainbond Java源码多模块构建"
Hidden: true
Weight: 22004
---

### Maven 多模块项目构建识别策略

Maven 多模块项目是根据 pom.xml 文件(下面简称 pom)来划分的, Rainbond 对它的识别也是建立在 pom 的基础上的. 主要是识别出具体模块(module)的构建命令和启动命令. 构建命令的作用是指定需要构建的模块, 是类似于 "mvn install -pl 'module name' -am" 的 mvn 命令. 启动命令的作用是在构建完成后, 指定需要执行的 Jar 包, 是类似于 "web: java $JAVA_OPTS -jar *.jar" 的命令.

识别策略:

1. 根据根 pom 中的 modules 中的 module 标签, 找到相应模块下的 pom.
2. 如果 pom 中的 packing 标签的值是 jar(war), 则解析出当前 pom 对应的模块名和 jar(war)包名. packing 标签的值为空, 会认为是 jar.
3. 模块名由名级父 pom 中的 module 标签的值组成, 用 "/" 分割, 类似于: rbd-worker/rbd-thirdparty.
4. jar(war) 包名默认是 ${artifaceId}-*.jar(war). 如果设置了 finalName 标签, 则会使用 finalName 标签的值; 如果finalName 标签使用了变量${project.name}或${project.aritfactId}, 则会使用变量对应的值; 如果使用了其他的变量, 则直接用 * 代替, 即: *.jar(war).
5. 如果 pom 中的 packing 标签的值是 pom, 且 modules 标签中的 module 多于 1, 则重复 1 ~ 5.

{{% notice note %}}

因为很多地方都使用了通配符 * , 在构建出来的 jar(war) 不只一个时, 识别出来的 jar(war) 包可能不能确定唯一的包; 又或者识别出来的 jar(war) 包有误, 这时候就需要用户手动进行修改.

{{%  /notice %}}

### 多模块项目源码规范

因为 Rainbond 对 Maven 多模块项目的识别是建立在 pom 的基础上的, 所以大家在书写的 pom.xml 文件, 符合 pom 的规范就好. pom 的规范请参考: [POM Reference](https://maven.apache.org/pom.html)

### 案例

