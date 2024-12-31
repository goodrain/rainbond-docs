---
title: WAF Firewall
description: Introduction to WAF firewall functionality and use.
---

The WAF firewall is an application layer firewall that focuses on protecting web applications from various network attacks and holes.Its role is to identify and block malicious requests to ensure the security of web applications and sensitive data.Web applications are one of the important assets for businesses and it is therefore essential to protect their security.The WAF firewall can prevent risk of data leaks, web site paralysis, customer privacy leaks.It also provides timely protection by responding quickly to new threats and gaps.

The objective of this document is to provide users with detailed information on the WAF firewall and a guide to its use.It will cover key WAF firewall features：rule management, log and monitoring, whitelist and blacklist management.

## Main features

The current WAF firewall mainly supports rule management, log and monitoring, whitelist and blacklist management, which are detailed in the following length.

### Rule management

![waf](https://static.goodrain.com/docs/enterprise-app/waf/waf.jpg)

The gate's WAF firewall contains six sets of rules inside the XSS cross-site script, defenses against Http protocol loopholes, defensive SQL injections, general defense, defensive malicious response, defensive denial of service attacks.Details below：

- Defend XSS cross-border scripts attack：to recognize and block malicious injections of scripts and prevent attackers from using client loopholes to access user information.

- Defend Http Protocol bug：to detect and prevent malicious requests, malicious file uploads, and other attacks on HTTP protocol.

- Defensive SQL injects：to recognize and intercept malicious SQL queries to prevent an attacker from obtaining sensitive data by injecting an attack.

- General defense：detects and blocks common web attacks, such as path traversions, code executions, etc.

- Defend malicious response：to detect and intercept malicious responses, such as malicious redirections, malicious file downloads, etc. to protect users from attack.

- Defensive Rejection Service Attack：Detects and prevents DDoS attacks, violent breaks, etc. Denial service attacks and ensures the availability and stability of web applications.

### Log and Monitor

The WAF firewall provides a full log recording and reporting functionality, records all visits and security incidents for security audits and threat analysis.For illegal visits, detailed information can be obtained through the log and defended with the corresponding firewall rules.

### Whitelist and blacklist management

The WAF firewall allows users to define whitelists and blacklists to control access to specified IP addresses.Through white-list and blacklist management, users have the flexibility to manage access controls to ensure that legitimate traffic is allowed to pass normally, while discouraging known malicious requests and attacks.

## Manual

### Add, Modify and Delete Rules

In the WAF firewall, add, modify and delete rules are configured at the Gateway Policy.

1. Enter team view or app view

2. Click on the `gateways` button on the left sidebar, select the gateway strategy you need to protect

3. Click `Edit` to open the `WAF firewall` in the `safe`.

4. Select corresponding rule types such as defensive XSS cross-station scripts, SQL injections, etc.

5. Save rule settings and take effect

Remove all rules to turn off the `WAF Firewall` switch directly, delete some rules and change them in the checkbox.

### Monitor and analyze WAF firewall logs

The WAF firewall provides log recording and reporting to enable you to monitor and analyse access and security events.Query logs by default is required on gateway. You can execute the command below to query detailed：

```bash
kubtl logs-fl name=rbd-gateway -nrbd-system
```

When you have access blocked by the WAF firewall, you can see the following log information

```bash
2023/05/10 16:30:52 [error] 3084#30844: *207007927 [customer 10.43.83.34] Modsecurity: Access denied with code 403 (phase 2). Matched "Operator `Ge' with parameter `5' against variable `TX:ANOMALY_SCORE' (Value: `5') [file "/usr/local/openresy/nginx/conf/modsecurity/rules/REQUEST-949-BLOCKING-EVALUATION. onf"] [line "80"] [id "949110"] [rev ""] [msg "Inbound Anomaly Scored (Total Score: 5)"] [data ""] [sever "2"] [ver "OWASP_CRS/3. 2.2"] [maturacy "0"] [tag "application-multi"] [tag "language-multi"] [tag "platform-multi"] [tag "attack-generic"] [hostname "10.10.10. 5"] [uri "/"] [unique_id "16837938236.800594"] [ref ""], client: 10.43.83.34, server: nginx-test.grapps.cn, request: "PUT/HTTP/1.1", host: "nginx-test.grapps.cn"
```

Based on the previous log, you can get details of blocked requests, including the client's ip, the domain name of the visit, the method of the request, the time of interception, and which rule has been blocked.This example above indicates a PUT request to visit nginx-test.grapps.cn this domain, triggering rules with id 949110 in REQUEST-949-BLOCKING-EVALUATION.conf this rule file.You can view corresponding rule information by accessing this profile.

1. Enter gateway terminals

```bash
POD_NAME=$(kubectl get po -l name=rbd-gateway -n rbd-system -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $POD_NAME -n rbd-system -- bash
```

2. View the specified rule file, the file path will be given in the exception log

```bash
cat /usr/local/openresty/nginx/conf/modsecurity/rules/REQUEST-949-BLOCKING-EVALUATION.conf
```

3. Find corresponding rules and find solutions according to the rule id in the rules document

### Best practices for whitelists and blacklists

The whitelist and blacklist are important tools in the WAF firewall for controlling access access.Use to control access to allow or disable specific IP addresses.You can set a certain IP address or an IP, noting that：black and white lists are mutually exclusive, you can only enable blacklists individually or whitelisting.Black and white lists, like WAF firewalls, are configured at the gateway strategy.

1. Enter team view or app view

2. Click on the `gateways` button on the left sidebar, select the gateway strategy you need to protect

3. Click `edit` to select `blacklist` or `whitelist` in the `safe`.

4. Enter an IP address or an IP segment.e.g. 192.168.0.1 or 192.168.0.1/24

5. Save rule settings and take effect

Below are best practices strategies that help you manage whitelist and blacklist： more effectively

- Determines that trusted IP addresses and domains：identify trusted IP addresses and domains based on business needs and security strategy. They should be added to whitelisting, allowing unlimited access to your application.
  This may include Intranet IP addresses, partner IP addresses, or specific third-party service IP addresses.

- Add only the required IP address and domain name：to avoid adding all IP addresses or domain names to whitelist to reduce the risk of error or security loopholes.
  Only add IP addresses and domain names that really need access to your application and limit the scope of access.

- The whitelist and blacklist：are regularly reviewed and updated to ensure that IP addresses and domain names in the whitelist and blacklist are still currently credible and delete entries that are no longer required.

- Log analysis and behavior analysis：monitor white and blacklist access logs and analyzes if there is an abnormal behavior or potential security threat.Based on the results of the log analysis, the white and black lists are updated in a timely manner to enhance protection against malicious visits.
