---
title: Rainbod help "Creative Apple" migrated to cloud
description: The ICT applications innovation industry is an important component of the country's digital transformation and an important backbone of critical infrastructure.Its core is to address the problem of the neck of the core technology critical chain, thereby providing a solid digital basis for China’s development, through industrial applications that drive the construction of a nationally-produced IT software and hardware base and a full-cycle ecosystem.
slug: localization-guide
image: https://static.goodrain.com/wechat/localization-guide/%E4%BF%A1%E5%88%9B.png
---

Release of Rainbond v5.14.2, also known as the **fumigation**.Beginning with this version, open source users can also use Rainbond to manage hardware computing resources that meet the requirements of confidence creation.In this version, \*\*The product team separates what previously existed only in an enterprise version of products and integrates into open source product lines.**This paper focuses on the theme of how to migrate to the clouds in a trust-generating environment** and provides a viable solution to the problem by combining the capacity of Rainbond Creation.

## The need to migrate to a trusted environment

The ICT applications innovation industry is an important component of the country's digital transformation and an important backbone of critical infrastructure.Its core is to address the problem of the **necks** core technology key elements, thereby providing a solid digital basis for China’s development, through industrial applications that drive the construction of a nationally-produced IT software and hardware base and a full-cycle ecosystem.

For software suppliers in general, when software is sold to party militaries, meeting the requirements of national production confidence creation has become a hard standard that cannot be circumvented.Even if the software has been delivered, in the later stages of the construction plan, the party political companies in the period of the transition will impose hard requirements for migration to the national-producing environment of creditworthiness.The underlying demand always conceals business opportunities and masters the migration of applications in the context of national productive trusts, transforming software products into **trust-generation applications** is the capability that all ToB/ToG ICT applications must now have.Rainbond Creations can play a significant role in such a scenario.

## Ecology for Creative Hard

Creativity applications must operate on nationally produced hardware and operating systems.The most important of the domestically produced hardware ecology is CPU chips, and the structure of the CPU chip directly affects whether confidence creation applications can run on domestically produced hardware.Mainstream national production CPU manufacturers include Flightning, Huawei, Dragon, Season, Megige, etc. Its instructions are concentrated in `X86`, `Arm`, and the very autonomous `LoongArch` (follow-on to MIPS set of directives).The different sets of instructions have a direct impact on the need to regenerate them to suit them.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%9B%BD%E4%BA%A7CPU%E7%94%9F%E6%80%81.png)

It is easy to see that the ecology of domestically produced CPU chips has so many features：

- `LoongArch` is the most autonomous, but its ecology is severely limited and does not allow for good market-oriented extension for short periods.
- The most ecologically rich `X86` command of sea light and megigabytes is authorized, but with the least autonomy.`X86` is too mature and stable, and it is difficult to innovate on this basis when the building is already in place.
- Warsaw, flying with `Arm` command authorization, moderate autonomy, and `Arm` ecology in a booming way, can use the `X86` Ecology to restrain the wrist.

The feedback from the market is reasonable, and in the current CPU chip market, it is leading in the party domain in the city of PC and capturing the main share of the operator server in the light of sea and pointer.To return to the perspective of the Vendor of the Creativity Application,**How to hit Arm will be the key point for breaking into the national production queue**.Rainbond Creative Version uses **a cloud of multi-chip** capacity to facilitate multi-structured clusters of tubes, including Arm.

## Arm & x86 Cluster "One cloud of multichit"

By definition, the isomer cluster of[一云多芯](https://www.rainbond.com/docs/localization-guide/multi-arch-installation) means that its CPU chip architecture is not unique in the computing node of the same cluster.

As a rule, the CPU chip architecture is based on the `X86` set of instructions from Intel Corporation, and the `amd64` set of instructions that are fully compatible with `X86` can be considered equivalent.And in the case of national production confidence creation, many multi-country production CPU structures are developed based on the `Arm` command set-up, and commonly known as the SAP 920, the flying chip and so on.In order to be able to integrate into the national production of IT ecology, Rainbond self-confidence started and fully compatible with the `Arm` architecture.

National production of letters is by no means overnight and a large number of applications developed under the traditional `X86` framework will take a long time to adjust or even reconstruct to operate exclusively on the national production chips, the ability of a cloud of multiple chips to run multiple architecture applications simultaneously will play a major role in the transition phase of national production substitution.

Rainbond Creative Version allows for the unified management and movement control of CPU nodes in the same cluster, as well as multiple individual architecture clusters with multi-cluster management capability.Unequal flexibility allows decision makers to decide on the deployment strategy for calculating resources for their own isomers.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E9%9B%86%E7%BE%A4%E7%AE%A1%E7%90%86.png)

In addition to the Arm architecture, Rainbond Creative Versions are compatible with mainstream production of software and hardware, are fully supportive of the scenario and are certified by large CPU manufacturers and operating system manufacturers in the country.The development, delivery and delivery processes of integrated management confidence-building applications significantly reduce the cost of managing applications under the national production confidence-building scenario.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%9B%BD%E4%BA%A7%E8%AE%A4%E8%AF%81%E9%9B%86%E5%90%88.png)

## Creativity App Migration Point

The development of a set of confidence-building applications from scratch is not a difficult task for suppliers of confidence-building applications.Our ecology is becoming more and more complete, with no gaps in operating systems, development tools or databases, which provide comprehensive support for the development of new confidence-building applications.**The real difficulty is how to migrate legacy systems already operating in traditional servers to a home-based trust creation** environment.Crossing from the traditional `X86` to the `Arm` architecture essentially means that all service components in the operations system are recompiled, or even reconfigured.In the context of business continuity, we cannot escape the need to complete the conversion of traditional applications to confidence-building applications.

First, let's make a category： according to the language of service development and how to run it.

### Explanatory language

Explanatory languages represented by Python, PHP and Shell, also referred to as scripts, are completely unrelated to CPU structures.We simply need to provide language interpreters that can be used in a trust-generating environment to run this service without changing a line of code.

### Byte type compilation file

This type is represented by Jar, War Pack compiled in Java language.Jar and War Packages are very common software deliveries.Since it packs bytes that are not associated with the CPU architecture, it is ultimately run by the cross-platform JVM VM VM, so we only need to provide JDK, JRE tools that can be used in the confidence creation environment to run this service without changing a line of code.

### Compilation Language

The description is not rigorous because the byte code is also produced in the language of compilation.Here we refer specifically to compilations of languages represented by C, C++, and Golang, which are related to CPU architecture and compiled binary products can only be run under the specified CPU structure.This characteristic also means that the migration process must be re-compiled in order to operate in a trust-creation environment.

The transfer of legacy operational systems to the home productive environment is by no means easy and requires close cooperation between the party and the supplier.However, due to the nature of legacy business systems, the support that suppliers can provide is different.Different levels of support have a direct impact on the effects of migration.

### Provide support

The problem is much simpler when the party resolves to move a legacy business system, just as the period of support promised by the supplier has not expired and the supplier can provide comprehensive support for the relocation of the business system.Even in the case of codified languages, letter-generation migration can be completed when the source code can be recompiled, but it is time-consuming.

### No support provided

When Party A resolves to move a legacy business system, it is very difficult to do so when the period of support promised by the supplier has expired, and even cannot be linked to the supplier.Party A is less aware of legacy business systems and can only find software deliverables for analysis and re-build compilations and operating environments based on a trust-generating environment.However, for some of the older business systems, it is difficult to find the source code for the year, and if the service is properly a binary document compiled in a codified language, it basically means that the infestation migration is on the path to death.At this point, Party A had to consider resoliciting another supplier to re-engineer the system. The new alternative system would never fall overnight and the service would not impede the process of national production as a whole.

**Rainbond version of "Trust" is a core feature that supports cloud migration of traditional apps in a fuse environment**.It follows closely the different language types used by users and automates the process of letter-generation migration.Once all components are deployed successfully, cross-structured micro-service programming can be achieved through the built-in ServiceMesh Microservice Architecture, linking service components to complete business systems.

## Traditional apps migrate to cloud

Rainbond generation versions automatically shield the differences in the architecture, migrating the application to the home fun environment at minimal cost.Only source code is provided and can be compiled and run in the specified architecture environment.Open source stores provide different application templates and hundreds of open source software one-click deployments.Creative applications can recompile different types of services and deploy them to an infancy environment with minimal technical and time costs.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%BF%81%E7%A7%BB.png)

## Isomal microservice organization capability

Rainbond Creative Version with **a cloud of multi-chip** ability to manage computing nodes of different CPU structures in the same cluster.The service component in the app can also be deployed to the specified structure as required.However, only if the microservices components of the different structures can be structured and communicated, they can become an organic whole and form a complete business system.It also meets the special requirements for the period of transition from the traditional `X86` to the `Arm` country.

Based on the ability of Service Mesh or Kubernetes Service, Rainbond natural supports the organization and communication between cross-structure microservices.Using methods is not the same as that used by Rainbond to drag and drop wooden microservices.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E5%BE%AE%E6%9C%8D%E5%8A%A1%E7%BC%96%E6%8E%92.png)
