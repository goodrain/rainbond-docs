---
title: Auto Build
description: Complete Guide to Configuration and Usage of Rainbond Auto Build Feature
keywords:
  - Auto Build
  - Continuous Build
  - Webhook
  - Image Auto Build
  - API Auto Build
---

## Overview

Auto build is a crucial part of modern development processes, enabling automatic triggering of application builds and deployments upon code or image changes.Rainbond offers various auto-build methods to effectively enhance development efficiency, shorten development cycles, and assist teams in achieving agile development and continuous delivery.

Rainbond supports the following auto-build methods:

1. [Code Repository Auto Build](../app-deploy/gitops.md): Supports Webhooks for code repositories like GitHub, GitLab, Gitee
2. [Image Repository Auto Build](../app-deploy/image/via-registry-deploy.md): Supports Webhooks for Docker Hub, Alibaba Cloud Image Repository
3. API Auto Build: Provides API interfaces, supporting integration with third-party CI/CD tools

## API Auto Build

API Auto Build is the most flexible auto-deployment method, easily integrating with various CI/CD tools such as Jenkins, GitLab CI, GitHub Actions, etc.

### Configuration Steps

1. Enter the component → Build source → Enable API Auto Build
2. Set a custom secret key, which is used to verify the legality of API calls. Please set a complex and secure value
3. Save configuration

### API Usage

Use the curl command to call the API to trigger auto build:

```bash
curl -d '{"secret_key":"<secret_key>"}' -H "Content-type: application/json" -X POST <API_address>
```

### Integration with CI/CD Systems

#### Jenkins Integration Example

Add the following script in Jenkins Pipeline:

```groovy
stage('Trigger Rainbond Build') {
    steps {
        sh '''
        curl -d '{"secret_key":"<secret_key>"}' -H "Content-type: application/json" -X POST <API_address>
        '''
    }
}
```

#### GitLab CI Integration Example

Add in `.gitlab-ci.yml` file:

```yaml
deploy:
  stage: deploy
  script:
    - curl -d '{"secret_key":"<secret_key>"}' -H "Content-type: application/json" -X POST <API_address>
```

#### GitHub Actions Integration Example

Add in GitHub Actions workflow file:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Rainbond Build
        run: curl -d '{"secret_key":"<secret_key>"}' -H "Content-type: application/json" -X POST <API_address>
```

## Common Problems

### API Auto Build Failure

**Possible Reasons**:

- Secret key mismatch
- API call format error
- API address error

**Solutions**:

- Ensure the secret key used matches the configured secret key
- Check if the API call's JSON format is correct
- Verify the API address is complete and correct
