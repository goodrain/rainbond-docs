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
    title: 'AgileTs',
    description: 'Global State and Logic Framework for reactive Applications',
    preview: require('./apps/agilets.png'),
    website: 'https://agile-ts.org/',
    deploy: 'https://github.com/agile-ts/documentation',
    tags: ['opensource'],
  },
  {
    title: 'AI-Speaker',
    description: 'Local, reliable, fast and private Audio and IoT gate.',
    preview: require('./apps/aispeaker.png'),
    website: 'https://ai-speaker.com/',
    deploy: 'https://github.com/sviete/AIS-WWW',
    tags: ['opensource'],
  },
  

  /*
  Pro Tip: add your site in alphabetical order.
  Appending your site here (at the end) is more likely to produce Git conflicts.
   */
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
