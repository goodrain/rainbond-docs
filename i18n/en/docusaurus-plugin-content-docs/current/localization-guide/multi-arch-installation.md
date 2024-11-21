---
title: Heterogeneous cluster installation
---

# Introduction to the “One cloud of multichith” isomer cluster

By definition, a “cloud of multichith” isomer cluster means that its CPU chip architecture is not unique in the computing nodes in the same cluster.

In general, the CPU chip architecture is based on the `X86_64` set of instructions from Intel Corporation and the `amd64` set of instructions that are fully compatible with `X86_64` can be considered equivalent.And in the case of the National Creative Trust Scenario, many production CPU structures are developed on the basis of the `arm64` directive, and commonly known as the `pupil 920, flown chip etc.In order to be able to integrate into national production messages with IT ecology, Rainbond has been fully compatible with the `arm64\` architecture since the start of the version of the Creation.

National production of confidence is by no means overnight, and many applications developed under the traditional `X86_64` framework will take a long time to adjust or even restructure to operate exclusively on the national production chips and the ability of “one cloud of multichias” to operate multiple architecture applications simultaneously will play a significant role in the transition phase of nationalization substitution.

Rainbond version allows for the unified management and movement of CPU structures to compute nodes in the same cluster, while allowing multiple individual architecture clusters to be built with multi-cluster management capabilities.Unequal flexibility allows decision makers to decide on the deployment strategy for calculating resources for their own isomers.

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/localization-guide/%E5%BC%82%E6%9E%84%E9%9B%86%E7%BE%A4%E7%AE%A1%E7%90%86.png)

# Installation of isomer clusters

Rainbond version optimizes [从主机安装](/docs/installation/installation-with-ui/) logic. Users only need to provide IP addresses for all nodes, node types to complete cluster installation.Installing controllers will automatically identify CPU structure information for all nodes, complete the configuration and incorporate it into clusters.The entire process does not require any special configuration for CPU structures.
