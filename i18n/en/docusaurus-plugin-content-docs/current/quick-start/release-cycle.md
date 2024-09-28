---
title: Version release cycle
description: Rainbond version release cycle
hidden: true
---

## 1. Version number specification

Version format：`ABC`

- A : Indicates the major version number. Generally, when the software is rewritten as a whole, the underlying components are upgraded in major versions (Docker, Kubernetes), or there are changes that are not backward compatible, A is added.
- B : Indicates that the function is updated, and B is added when a new function appears
- C : Indicates a small modification, such as fixing a bug, as long as there is a modification, add C

---

<b>version example：`3.6.1`</b>
means, the 6th feature update version in the 3rd major version, and a version bug fix was made in this feature update version.

## 2. Version update cycle

| Version type                              | Update Cycle                | illustrate                                                                          |
| ----------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| A: Large version number   | 6~12 months | Version refactoring, upgrade of underlying key components, backward incompatibility |
| B: Feature update version | 1~3 months  | Feature update                                                                      |
| C: Bug fixes              | 1~2 weeks   | Bug or security patch                                                               |

## 3. The current version and description

| version number                        | illustrate                               |
| ------------------------------------- | ---------------------------------------- |
| 3.4                   | Historical version, no longer maintained |
| 3.5.2 | Historical version, no longer maintained |
| 3.6.1 | Historical version, no longer maintained |
| 3.7.2 | Historical version, no longer maintained |
| 5.0.X | Historical version, no longer maintained |
| 5.1.X | Current production version               |
| 5.2.X | Current Development Version｜             |
