---
title: Contribution Guide
description: Guide you to contribute to Rainbond
---

## Contribute to Rainbond

Rainbond is a cloud-native application management platform, easy to use, no need to understand containers, Kubernetes and underlying complex technologies, supports managing multiple Kubernetes clusters, and managing the full lifecycle of enterprise applications.Main features include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, application-level multi-cloud management, etc.

If you are interested in contributing to Rainbond, we hope this document will make your contribution process simpler, faster, and more effective.

If you are a beginner in open source contribution, you can refer to the [Open Source Guides](https://opensource.guide/) website, which provides some open source contribution guides and a series of resources for individuals, communities, and companies who want to learn how to contribute to open source projects.

## CODE_OF_CONDUCT

Rainbond expects project participants to adhere to the code of conduct, please read [CODE_OF_CONDUCT](https://github.com/goodrain/rainbond/blob/main/CODE_OF_CONDUCT.md).

## Get Involved

There are many ways to contribute to Rainbond, not just code contributions:

- Address unresolved [issues](https://github.com/goodrain/rainbond/issues), propose your solutions.
- Report Bugs.When you find a bug, please use [issues](https://github.com/goodrain/rainbond/issues) to report and discuss.
- Propose new features.When you want to propose a new feature, please use [issues](https://github.com/goodrain/rainbond/issues) to report and discuss.
- [Code Contribution](/docs/contribution/code/)
- [Documentation Contribution](/docs/contribution/document/)

Contributions are very welcome. If you think your contribution needs help, please contact [community support](/docs/support) to contact us, and Rainbond TOC members will help you continue to contribute.

The following are the main steps to contribute to Rainbond:

1. Fork the corresponding repository according to the project and documentation
2. Clone to local and install dependencies
3. Create a new branch for development or documentation modification
4. Run or package test locally
5. Submit a compliant Commit and push to the remote repository
6. Create a Pull Request, explaining the problem solved by your submission
7. Wait for CI checks and maintainer review
8. If approved, it will be merged into the main branch; if modifications are needed, they will be discussed in the PR

## Git Commit Specification

We refer to [Angular Specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits), trying to provide clearer historical information, making it easier to judge the purpose of submission and browse.Each commit message contains a header, body, and footer.The header has a special format including type, scope, and subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

There must be a blank line between header, body, and footer, the header is required, scope is optional.Each line of the commit message cannot exceed 72 characters.This makes it easier to read on github and git tools.

### Type

type is used to explain the category of the commit, must be one of the following types:

- feat: new feature
- fix: bug fix
- docs: documentation changes only
- style: changes that do not affect the meaning of the code (e.g., spaces, formatting, missing semicolons)
- refactor: code changes that neither fix a bug nor add a feature
- perf: code changes that improve performance
- test: adding or correcting tests
- chore: changes to the build process or auxiliary tools, such as generating documentation
- ci: changes to CI configuration or scripts, such as Github Actions
- revert: revert a commit

### Scope(Optional)

scope is used to explain the scope of the commit, when there are multiple affected scopes, you can use \* or leave it blank.scope is optional, it can provide additional context information for the type and is included in parentheses, it can be the content that specifies the location of the commit change.It can also be a link to a Github issue.For example: fix(worker), fix(#123), etc.

### Subject

subject is used to briefly describe the commit changes:

- Use imperative mood, generally starting with the original form of the verb, for example, use change instead of changed or changes
- First letter lowercase
- No period (.) at the end

### Example

```
feat: add code audit function

fix(api): wrong number of running apps

style: add couple of missing semi colons
```

## Tools for Writing Qualified Commit Messages

[Commitizen](https://github.com/commitizen/cz-cli) is a tool for writing qualified Commit messages.

### Installation

```
npm install -g commitizen
npm install -g cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### Usage

```
git add .
git cz
```

Next, select the corresponding affected scope and enter the commit message.

## Pull Request Specification

When we accept a Pull Request, all commits will be squashed into one.Therefore, the title of the Pull Request will become the subject line of the commit message.So we hope the title of the Pull Request can also provide more accurate information.Please ensure that the title of the Pull Request uses the same format as the subject line in the commit message.If this format is not followed, it will not pass the CI check.
