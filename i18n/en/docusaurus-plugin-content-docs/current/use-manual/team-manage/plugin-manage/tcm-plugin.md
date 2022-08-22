---
title: Application Performance Analysis Plug-in Description
description: The principle and usage instructions of the service performance plugin installed by default in Rainbond
---

> The current document continues to be completed

### How the Profiling Plugin Works

The performance analysis plug-in runs in the same network space as the target analysis service and monitors the traffic of the network card to statistically analyze the work performance of the service. This is a bypass mechanism and has no special impact on the workflow and performance of the service itself. The plug-in Collect network packets from the TCP layer of the network, and analyze different protocol request and response packets by implementing decoders of different protocols.

- <b>How to get the network card traffic of the container where the service is located</b>

The performance analysis service is installed as a plug-in by the Rainbond service. According to the definition of Rainbond's support for the plug-in, the plug-in and the main business service run in the same network space, so the container network card devices where they are located can be regarded as the same device.

- <b>How to perform protocol analysis</b>

The obtained traffic packets exist in the form of packets.

### Plugin configuration items
