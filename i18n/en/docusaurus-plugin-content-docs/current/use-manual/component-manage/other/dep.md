---
title: Component Dependencies
description: Learn how to rely on components in the Rainbod platform, enable automatic startup between components and environmental variable injection.
---

### What is a component dependency?

Rainbod provides a powerful component dependency that allows you to manage the relationships between components more flexibly during the app deployment.Component dependencies allow you to establish connections between components, including making other components dependent on the current component and relying on other components themselves.This dependency is not only automatically built at startup, but it also enables automatic injection of environmental variables.

### How to build component dependencies?

#### 1. Make other components dependent on the current component

In the Rainbod console or via the API, you can easily define the dependencies of other components for the current component.This allows other components to automatically wait for the start of the current component on startup to ensure the correct start order of the entire application.

#### Self-reliance on other components

Similarly, you can configure the current component to rely on other components.This means that the current component awaits the start of the dependent component at startup to satisfy the correct dependency on the component.

### Automatic Environment Variables Injection

When a component dependency is created, Rainbod automatically injects dependent information into the environment variable to facilitate your app's access and use.This provides easy means of communication between components, while reducing the complexity of manual configurations.

### Example：builds dependencies

Assume you have a web app and a database component.By setting up Webapp dependencies on database components, you can ensure that Web apps are properly connected to the database at startup.Rainpond automatically manages the sequence of startup and the injection of environmental variables, simplifying the deployment and maintenance process for the entire application.
