---
title: Component other Settings
description: Component Other Settings This section describes function modules
---

## Component deployment type

- The statelessness service (Deemployment Type)
  is generally used for Web classes, API classes, etc.

- State Service (Statefulset type)
  is generally used for DB, message intermediate classes, data classes

- Task (Job Type)
  is generally used for a one-time task and the container exits upon completion

- Periodical Tasks (Cronjob Type)
  is generally used to handle periodic scheduled Tasks that need to be repeated

## Component Health Detection

The health test is for the true state of operation of the reaction component business.When health tests are not configured, the operation status of the component is determined by the container (process) status, where the container is successful and the component is considered to be already in ready.An instance of the already state component will be added to the traffic process immediately.However, we are all aware that most of the procedural operations require a start-up time, the longer the more complex components generally take from the start to the preparation of the business.Unready components to accept business requests will cause some requests to fail.Especially during the rolling upgrade of the component, the platform starts new instances to receive traffic and closes the old instance when the component health is not accurately reflected.The scroll upgrade effect will be discounted.Start up so we need to verify the true state of the component as much as possible through a mechanism that is the component health test.

Component health testing currently supports the following two mechanisms：

- <b>TCP port detects</b> this test by attempting to establish TCP connection to the component configured port if it is normally established.
- <b>HTTP Business Detect</b> Port build listeners and does not fully represent business normality so that for HTTP class services you can request to the specified route to judge component health by status code.This pattern is more precise.

Component must undergo a health test after component starts. When component is unhealthy, there are two types of treatment：

- Set component to unhealthy

> When the component instance is set to be unhealthy, it will be offline from the app gateway and ServiceMesh network.Waiting for normal work to get back online.But Rainbond will not offline if there is only one instance of the component.

- Restart Component Instance

> Some components may result in a dead locking process due to code blocking, which cannot be provided but which is still running.Handling unhealthy state of such components can only be done by restarting instances.

The user can therefore judge the appropriate way of dealing depending on the state of business.

### Operating processes

Component Health Detection is configured in the _Component Control Panel/Other Settings_ page.

1.Tap the Edit button for health detection to display the health test configuration items.

- Port：selects the port where the component is being tested for health. If there is no actual detection port in the option, please add it to the port management page.
- The probe protocol： selects TCP support and HTTP based on the above and selects different protocol follow-on settings items.
- Unhealthy： is 'offlined' by default. You can choose 'Restart'.
- The HTTP protocol corresponding to settings： selects the HTTP protocol to set the detectable path and request head (e.g. a token request), noting that the routing request must return to a status code less than 400 is considered healthy.
- Initialization waiting time：refers to the time when the component instance starts starting, default is 4 seconds.
- Detection interval：refers to the interval between two consecutive detection tasks.
- Timeout for detection：will take effect if a problem request is blocked while a request is detected.
- Successive success times：are the number of successful consecutive tests that indicate a component instance as a state of health.

The above information is filled out on a case-by-case basis and the maintenance of which requires updating of the component health screening mechanism will take effect.

2.Enable/disable health detection

The developer may need to temporarily disable health testing to keep the component healthy.Enable/disable health detection.Changes require an update of the component to take effect.
