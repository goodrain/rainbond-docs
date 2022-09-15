/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  | 'opensource'
  //-----------------------------------
  // | 'product'
  // // Feel free to add the 'design' tag as long as there's _some_ level of
  // // CSS/swizzling.
  // | 'design'
  // // Site must have more than one locale.
  // | 'i18n'
  // | 'versioning'
  // // Large sites are defined as those with > 200 pages, excluding versions.
  // | 'large'
  // | 'meta'
  // | 'personal'
  // // Right-to-left direction.
  // | 'rtl';
  //-----------------------------------

// Add sites to this list
// prettier-ignore
const Users: User[] = [
  {
    title: 'Apollo',
    description: 'Apollo（阿波罗）是一款可靠的分布式配置管理中心',
    preview: require('./apps/apollo.jpeg'),
    website: 'https://github.com/apolloconfig/apollo/',
    deploy: '/blog/apollo',
    tags: ['opensource'],
  },
  {
    title: 'Arthas',
    description: 'Arthas 是一款线上监控诊断产品，通过全局视角实时查看应用 load、内存、gc、线程的状态信息',
    preview: require('./apps/arthas.png'),
    website: 'https://github.com/alibaba/arthas',
    deploy: '/blog/arthas',
    tags: ['opensource'],
  },
  {
    title: 'DolphinScheduler',
    description: 'Apache DolphinScheduler 是一个分布式易扩展的可视化DAG工作流任务调度开源系统',
    preview: require('./apps/dolphinscheduler.png'),
    website: 'https://github.com/apache/dolphinscheduler',
    deploy: '/blog/dolphinscheduler',
    tags: ['opensource'],
  },
  {
    title: 'DevLake',
    description: 'Apache DevLake 是一个开源开发数据平台，从 DevOps 工具中提取、分析和可视化碎片数据',
    preview: require('./apps/devlake.png'),
    website: 'https://github.com/apache/incubator-devlake',
    deploy: '#',
    tags: ['opensource'],
  },
  {
    title: 'EMQX',
    description: 'EMQX 是一款大规模可弹性伸缩的云原生分布式物联网 MQTT 消息服务器',
    preview: require('./apps/emqx.png'),
    website: 'https://github.com/emqx/emqx',
    deploy: '/blog/emqx',
    tags: ['opensource'],
  },
  {
    title: 'Elasticsearch',
    description: 'Elasticsearch 是分布式搜索和分析引擎',
    preview: require('./apps/es.png'),
    website: 'https://github.com/elastic/elasticsearch',
    deploy: '/blog/elk',
    tags: ['opensource'],
  },
  {
    title: 'Fluentd',
    description: 'Fluentd 是一个用于统一日志层的开源数据收集器',
    preview: require('./apps/fluentd.jpeg'),
    website: 'https://github.com/fluent/fluentd',
    deploy: '/blog/fluentd',
    tags: ['opensource'],
  },
  {
    title: 'Filebeat',
    description: 'Filebeat是用于转发和集中日志数据的轻量级传送程序',
    preview: require('./apps/filebeat.png'),
    website: 'https://github.com/elastic/beats',
    deploy: '/blog/elk',
    tags: ['opensource'],
  },
  {
    title: 'Jaeger',
    description: 'Jaeger 是开源分布式跟踪系统',
    preview: require('./apps/jaeger.png'),
    website: 'https://github.com/jaegertracing/jaeger',
    deploy: '/blog/jaeger',
    tags: ['opensource'],
  },
  {
    title: 'Kibana',
    description: 'Kibana 是一款开源的数据分析和可视化平台',
    preview: require('./apps/kibana.png'),
    website: 'https://github.com/elastic/kibana',
    deploy: '/blog/elk',
    tags: ['opensource'],
  },
  {
    title: 'KnowStreaming',
    description: 'Know Streaming是一套云原生的 Kafka 管控平台',
    preview: require('./apps/knowstreaming.png'),
    website: 'https://github.com/didi/KnowStreaming/',
    deploy: '/blog/knowstreaming',
    tags: ['opensource'],
  },
  {
    title: 'OpenVScode',
    description: 'OpenVSCode 是一款基于Web 界面的在线IDE 代码编辑器',
    preview: require('./apps/openvscode.png'),
    website: 'https://github.com/gitpod-io/openvscode-server',
    deploy: '/blog/OpenVscode',
    tags: ['opensource'],
  },
  {
    title: 'Pyroscope',
    description: 'Pyroscope 是一个开源的持续性能分析平台',
    preview: require('./apps/pyroscope.png'),
    website: 'https://github.com/pyroscope-io/pyroscope',
    deploy: '/blog/knowstreaming',
    tags: ['opensource'],
  },
  {
    title: 'StreamPark',
    description: 'StreamPark 是流处理极速开发框架, 流批一体 & 湖仓一体的云原生平台, 一站式流处理计算平台',
    preview: require('./apps/streampark.png'),
    website: 'https://github.com/apache/incubator-streampark',
    deploy: '#',
    tags: ['opensource'],
  },
  
];

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  deploy: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  // favorite: {
  //   label: translate({message: 'Favorite'}),
  //   description: translate({
  //     message:
  //       'Our favorite Docusaurus sites that you must absolutely check out!',
  //     id: 'showcase.tag.favorite.description',
  //   }),
  //   color: '#e9669e',
  // },

  opensource: {
    label: translate({message: 'Open-Source'}),
    description: translate({
      message: 'Open Source Projects',
      id: 'showcase.tag.opensource.description',
    }),
    color: '#39ca30',
  },

  // product: {
  //   label: translate({message: 'Product'}),
  //   description: translate({
  //     message: 'Docusaurus sites associated to a commercial product!',
  //     id: 'showcase.tag.product.description',
  //   }),
  //   color: '#dfd545',
  // },

  // design: {
  //   label: translate({message: 'Design'}),
  //   description: translate({
  //     message:
  //       'Beautiful Docusaurus sites, polished and standing out from the initial template!',
  //     id: 'showcase.tag.design.description',
  //   }),
  //   color: '#a44fb7',
  // },

  // i18n: {
  //   label: translate({message: 'I18n'}),
  //   description: translate({
  //     message:
  //       'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
  //     id: 'showcase.tag.i18n.description',
  //   }),
  //   color: '#127f82',
  // },

  // versioning: {
  //   label: translate({message: 'Versioning'}),
  //   description: translate({
  //     message:
  //       'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
  //     id: 'showcase.tag.versioning.description',
  //   }),
  //   color: '#fe6829',
  // },

  // large: {
  //   label: translate({message: 'Large'}),
  //   description: translate({
  //     message:
  //       'Very large Docusaurus sites, including many more pages than the average!',
  //     id: 'showcase.tag.large.description',
  //   }),
  //   color: '#8c2f00',
  // },

  // meta: {
  //   label: translate({message: 'Meta'}),
  //   description: translate({
  //     message: 'Docusaurus sites of Meta (formerly Facebook) projects',
  //     id: 'showcase.tag.meta.description',
  //   }),
  //   color: '#4267b2', // Facebook blue
  // },

  // personal: {
  //   label: translate({message: 'Personal'}),
  //   description: translate({
  //     message:
  //       'Personal websites, blogs and digital gardens built with Docusaurus',
  //     id: 'showcase.tag.personal.description',
  //   }),
  //   color: '#14cfc3',
  // },

  // rtl: {
  //   label: translate({message: 'RTL Direction'}),
  //   description: translate({
  //     message:
  //       'Docusaurus sites using the right-to-left reading direction support.',
  //     id: 'showcase.tag.rtl.description',
  //   }),
  //   color: '#ffcfc3',
  // },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
