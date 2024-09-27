---
title: Contribution Guidelines
description: Guide you to contribute to Rainbond
---

## Contribute to Rainbond

Rainbond is a cloud-native application management platform that is easy to use and does not require knowledge of containers, Kubernetes and the underlying complex technologies. It supports managing multiple Kubernetes clusters and managing the entire lifecycle of enterprise applications.The main functions include application development environment, application market, microservice architecture, application delivery, application operation and maintenance, application-level multi-cloud management, etc.The main functions include the application development environment, the application market, the micro-service architecture, the application delivery, the application workload, and the application of cloud management.

If you're interested in contributing to Rainbond, hopefully this documentation will make your contribution process easier, faster, and more efficient.

If you're new to open source contributing, check out the [Open Source Guides](https://opensource.guide/) website, which provides some open source contributing guides, a collection of resources for people, communities, and companies who want to learn how to contribute to open source projects.

## CODE_OF_CONDUCT

Rainbond expects project participants to abide by the Code of Conduct, please read [CODE_OF_CONDUCT](https://github.com/goodrain/rainbond/blob/main/CODE_OF_CONDUCT.md).

## participate

There are many ways to contribute to：, not just code contributions0

- Deal with unresolved [issues](https://github.com/goodrain/rainbond/issues)and put forward your solution ideas.
- Feedback Bug.Feedback bugs.When you find a bug, please use [issues](https://github.com/goodrain/rainbond/issues) to report and discuss.
- New feature.Propose new features.When you want to propose a new feature, please use [issues](https://github.com/goodrain/rainbond/issues) to report and discuss.
- [code contribution](/community/contribution/compile/)
- [Documentation Contribution](/community/contribution/document/)
- [Contribute open source applications](/community/contribution/app-share/)to Rainbond App Store
- [Contribute open source plugins](/community/contribution/plugin/)to the Rainbond app store

Contributions are very welcome. If you think your contribution needs help, please add[small assistants to WeChat](/community/support)to contact us, and Rainbond TOC members will help you continue to contribute.

## Git Commit Specification

We refer to [Angular Specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits), and try to provide clearer historical information to facilitate the judgment of the purpose of submission and browsing.Each commit message contains a header, body and footer.The header has a special format with type, scope and subject：There should be a blank line between header, body, and footer. The header is required, and the scope is optional.The text of each line of the commit message cannot exceed 72 characters.This makes it easier to read on github and git tools.header has a special format package containing type, scope and subject：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

There is one line between header, body, footer, header is required and scope is optional.When we accept a Pull Request, all commits are squashed into one.So the title of the Pull Request will be the subject line of the commit message.So we hope that the title of the Pull Request can also provide more accurate information.Make sure that the title of the Pull Request uses the same format as the subject line in the commit message.If this format is not followed, the CI check will fail.This way children are more readable on github and git tools.

### Type

type is used to describe the category of commit, it must be one of the following types：

- feat: new features
- fix: fix bug
- docs: just documentation changes
- style: changes that do not affect the meaning of the code (e.g. spaces, formatting, missing semicolons)
- refactor: a code change that neither fixes a bug nor adds a new feature
- perf: code changes to improve performance
- test: add or fix tests
- chore: changes to builds or auxiliary tools, such as generating documentation
- ci: Modifications to CI configurations or scripts, such as Github Actions
- revert: roll back a commit

### Scope (optional)

scope is used to describe the scope of the impact of the commit. When there are multiple scopes, you can use \* or leave it blank.The scope is optional, it can provide additional contextual information to the type and is enclosed in parentheses, and it can be something that specifies where to commit changes.It can also be a link to fix an issue on Github.For example,：fix(worker), fix(#123), etc.Scope is optional, it can provide additional context information for the type and be included in parentheses, and it can be the content of the proposed location.It can also fix links to GitHub selected issues.e.g.：fix(worker), fix(#123), etc.

### Subject

subject is used for a concise description of commit：

- Use imperative sentences, usually starting with the original form of the verb, e.g. use change instead of changed or changes
- first letter lowercase
- Do not add a period (.) at the end

### Example

```
feat: ad code audit function

fix(api): wrong number of running apps

style: add multiple of missing semi colons
```

## Tools for writing qualified Commit messages

[Commitizen](https://github.com/commitizen/cz-cli) is a tool for writing qualified Commit messages.

### Install

```
npm install -g communitizen
npm install -g cz-cz-conventional-changelog
echo '56 "path": "cz-conventional-change" }' > ~/.czrc
```

### use

```
git add
git cz
```

Next, select the corresponding scope of influence and enter the commit message.

## Pull Request Specification

When we accept the Pull request, we compress all submissions into one.The title of the Full Request will therefore be the subject line for submitting messages.So we would like the title of the Pull Request to provide more accurate information as well.Please make sure that the Pull Request header is in the same format as the subject line in the submission message.If this format is not followed, it will not be possible to pass CI checks.

## Contributing to Rainbond will get you:

- The GitHub README will showcase your contributions and list your Github avatar and Github username.

- Contributor certificate issued by the Rainbond community

<img src="/img/contributor/contributor.png" width="60%" />
