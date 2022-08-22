---
title: reset admin password
description: Forgot administrator password, reset password, reset administrator password refer to this document
---

If the ordinary user's password is forgotten, the enterprise administrator can modify it on the user management page.

If the enterprise administrator password is forgotten and there is only one enterprise administrator.It can only be modified in the following way.

- First go into the terminal of the console container.

  The console of the docker run deployment, entered through the`docker exec`command.For the console deployed on Rainbond, first find the console Pod, and then enter it through the `kubectl exec` command.

- Execute the following command to change the specified user password.

```
python manage.py change_password --username=username --password=new password
```
