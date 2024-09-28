---
title: Reset Administrator Password
description: If you forget your administrator password, reset it by referring to this document
keywords:
  - Reset Rainbond Admin Password
---

Passwords for normal users can be changed by the enterprise administrator on the user management page if they are forgotten.

If the business administrator password is forgotten and only one business administrator is available.That could only be done through the following modalities.

1. Advanced to the terminal of the Console Container.

```bash
# The console is deployed in docker with
docker exec -it rainbond-allinone cash

# in POD
kubectl get pod -l name=rbd-app-ui -n rbd-system
kubtl exec -it rbd-app-ui-xxx-xxxx -n rbd-system bash
```

2. Execute the following commands to change the specified user's password.

```
python manage.my change_password --username=username --password=new password
```
