import React, {cloneElement, type ReactElement} from 'react';
import clsx from 'clsx';
import {
  useScrollPositionBlocker,
  useTabs,
  sanitizeTabsChildren,
  type TabItemProps,
} from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type {Props} from '@theme/Tabs';
import styles from '@docusaurus/theme-classic/lib/theme/Tabs/styles.module.css';
import {getUmamiEventSpecFromAttributes, trackUmamiEvent} from '@src/utils/umami';

function trackSelectedTab(attributes?: Record<string, unknown>) {
  const eventSpec = getUmamiEventSpecFromAttributes(attributes);

  if (!eventSpec) {
    return;
  }

  trackUmamiEvent(eventSpec.eventName, eventSpec.payload);
}

function TabList({
  className,
  block,
  selectedValue,
  selectValue,
  tabValues,
}: Props & ReturnType<typeof useTabs>) {
  const tabRefs: (HTMLLIElement | null)[] = [];
  const {blockElementScrollPositionUntilNextRender} =
    useScrollPositionBlocker();

  const handleTabChange = (
    event:
      | React.FocusEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const selectedTab = tabValues[newTabIndex];

    if (!selectedTab) {
      return;
    }

    const newTabValue = selectedTab.value;

    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      trackSelectedTab(selectedTab.attributes as Record<string, unknown> | undefined);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let focusElement: HTMLLIElement | null = null;

    switch (event.key) {
      case 'Enter': {
        handleTabChange(event);
        break;
      }
      case 'ArrowRight': {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0]!;
        break;
      }
      case 'ArrowLeft': {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1]!;
        break;
      }
      default:
        break;
    }

    focusElement?.focus();
  };

  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        'tabs',
        {
          'tabs--block': block,
        },
        className,
      )}>
      {tabValues.map(({value, label, attributes}) => (
        <li
          role="tab"
          tabIndex={selectedValue === value ? 0 : -1}
          aria-selected={selectedValue === value}
          key={value}
          ref={(tabControl) => tabRefs.push(tabControl)}
          onKeyDown={handleKeydown}
          onClick={handleTabChange}
          {...attributes}
          className={clsx(
            'tabs__item',
            styles.tabItem,
            attributes?.className as string,
            {
              'tabs__item--active': selectedValue === value,
            },
          )}>
          {label ?? value}
        </li>
      ))}
    </ul>
  );
}

function TabContent({
  lazy,
  children,
  selectedValue,
}: Props & ReturnType<typeof useTabs>) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  ) as ReactElement<TabItemProps>[];
  if (lazy) {
    const selectedTabItem = childTabs.find(
      (tabItem) => tabItem.props.value === selectedValue,
    );
    if (!selectedTabItem) {
      return null;
    }
    return cloneElement(selectedTabItem, {
      className: clsx('margin-top--md', selectedTabItem.props.className),
    });
  }
  return (
    <div className="margin-top--md">
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
        }),
      )}
    </div>
  );
}

function TabsComponent(props: Props): JSX.Element {
  const tabs = useTabs(props);
  return (
    <div className={clsx('tabs-container', styles.tabList)}>
      <TabList {...tabs} {...props} />
      <TabContent {...tabs} {...props} />
    </div>
  );
}

export default function Tabs(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      key={String(isBrowser)}
      {...props}>
      {sanitizeTabsChildren(props.children)}
    </TabsComponent>
  );
}
