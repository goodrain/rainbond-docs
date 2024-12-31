# Rainbond Document

Rainbond Document, Contains all documents for Rainbond 5.x.

This website uses [Docusaurus 2](https://docusaurus.io/) framework.

## How to develop?

### Prepare

Development Environment Requirements:

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) \>= 14 (with NPM)
- [Yarn](https://yarnpkg.com/en/docs/install) \>= 1.5

### Install

if yarn install Very slow，You can try configuring the Domestic Registry.

```
$ yarn config set registry https://registry.npmmirror.com
```

initialization

```bash
$ git clone https://github.com/goodrain/rainbond-docs.git
$ cd rainbond-docs
$ yarn install
```

### Local Start

```bash
$ yarn start
```

will automatically open in the browser `http://localhost:3000/`


### Local production test starts

Use the following command to simulate a production test launch locally

```bash
$ yarn serve --build .
```

## Contribution

Older versions of documentation are no longer maintained, Only the Current version is maintained.

Fork [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git), Modify the document and submit it to your own repository, submit Pull Request to [Rainbond-docs](https://github.com/goodrain/rainbond-docs.git)


### Typesetting requirements

* There must be spaces to distinguish between Chinese and English.
* Rainbond, R must be uppercase.
* The title is best is 1 2 3 4.
* The name of the title should be clear at a glance
* The imported image format is as follows
  ```html
  ![API](https://static.goodrain.com/images/5.1/images/api.png)
  <!-- can also be used  -->
  <img src="https://static.goodrain.com/images/5.1/images/api.png" width="100%" title="API" />
  ```
* The citation format for the link is as follows
  1. Links within the referenced document, Ref [docusaurus doc](https://docusaurus.io/zh-CN/docs/markdown-features/assets)
  2. Referring to external links must include http or https
  ```html
  [Rainbond](https://www.rainbond.com)
  
  <!-- can also be used  -->
  <a href="https://www.rainbond.com" target="_blank" />
  ```

* The video format is as follows

  ```html
  import Bvideo from "@site/src/components/Bvideo";
  <Bvideo src="//player.bilibili.com/player.html?aid=550933549&bvid=BV1Vq4y1w7FQ&cid=492223110&page=1"/>
  ```

* Code block usage reference [Docusaurus Code block](https://docusaurus.io/zh-CN/docs/markdown-features/code-blocks)

* User notice please use [Docusaurus notice](https://docusaurus.io/zh-CN/docs/markdown-features/admonitions)

#### Add Markdown file

If you need to add files, Add to the corresponding directory in the `docs/` directory, And fill in the new file names in order in `sidebars.js`, Ref [Docusaurus Sidebar](https://docusaurus.io/zh-CN/docs/sidebar)。



### Translation

Chinese translation to English, in the `i18n/en/docusaurus-plugin-content-docs/current` directory, Create files consistent with the ones in the `docs` directory.

For example: translate `docs/quick-install/quick-install.mdx` ，in the `i18n/en/docusaurus-plugin-content-docs/current` Create the same file in the same directory `i18n/en/docusaurus-plugin-content-docs/current/quick-install/quick-install.mdx`

#### Local Multilingual Start

```bash
$ yarn start -- --locale en 
```

The default is Chinese. After starting the English version, it will be automatically opened in the browser `http://localhost:3000/en`
