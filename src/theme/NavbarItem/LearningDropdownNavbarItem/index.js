import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {
  Collapsible,
  isRegexpStringMatch,
  useCollapsible,
} from '@docusaurus/theme-common';
import {isSamePath, useLocalPathname} from '@docusaurus/theme-common/internal';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';

import styles from './styles.module.css';

function isLinkActive(item, localPathname) {
  if (item.to && isSamePath(item.to, localPathname)) {
    return true;
  }
  if (item.activeBaseRegex && isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}

function hasActiveItems(sections, localPathname) {
  return sections.some((section) =>
    section.items.some((item) => isLinkActive(item, localPathname)),
  );
}

function LearningDropdownLinks({items, onItemClick}) {
  return (
    <div className={styles.sectionItems}>
      {items.map((item, index) => (
        <NavbarNavLink
          key={item.to ?? item.href ?? `${item.label}-${index}`}
          className={styles.sectionLink}
          activeClassName={styles.sectionLinkActive}
          {...item}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

function LearningDropdownMobileLinks({items, onItemClick}) {
  return (
    <ul className="menu__list">
      {items.map((item, index) => (
        <li className="menu__list-item" key={item.to ?? item.href ?? `${item.label}-${index}`}>
          <NavbarNavLink
            className="menu__link"
            activeClassName="menu__link--active"
            {...item}
            onClick={onItemClick}
          />
        </li>
      ))}
    </ul>
  );
}

function LearningDropdownDesktop({
  className,
  label,
  position,
  sections,
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const localPathname = useLocalPathname();
  const isActive = hasActiveItems(sections, localPathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'navbar__item',
        'dropdown',
        'dropdown--hoverable',
        styles.dropdown,
        {
          'dropdown--right': position === 'right',
          'dropdown--show': showDropdown,
        },
      )}>
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href="#"
        label={label}
        className={clsx('navbar__link', className, {
          'navbar__link--active': isActive,
        })}
        onClick={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
      />
      <div className={clsx('dropdown__menu', styles.menu)}>
        {sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <LearningDropdownLinks items={section.items} />
          </section>
        ))}
      </div>
    </div>
  );
}

function LearningDropdownMobile({
  className,
  label,
  onClick,
  sections,
}) {
  const localPathname = useLocalPathname();
  const containsActive = hasActiveItems(sections, localPathname);
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !containsActive,
  });

  useEffect(() => {
    if (containsActive) {
      setCollapsed(false);
    }
  }, [containsActive, setCollapsed]);

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <NavbarNavLink
        role="button"
        href="#"
        label={label}
        className={clsx(
          'menu__link',
          'menu__link--sublist',
          'menu__link--sublist-caret',
          className,
        )}
        onClick={(event) => {
          event.preventDefault();
          toggleCollapsed();
        }}
      />
      <Collapsible
        lazy
        as="ul"
        className={clsx('menu__list', styles.mobileMenu)}
        collapsed={collapsed}>
        {sections.map((section) => (
          <li
            className={clsx('menu__list-item', styles.mobileSection)}
            key={section.title}>
            <span className={styles.mobileSectionTitle}>{section.title}</span>
            <LearningDropdownMobileLinks
              items={section.items}
              onItemClick={onClick}
            />
          </li>
        ))}
      </Collapsible>
    </li>
  );
}

export default function LearningDropdownNavbarItem({mobile = false, ...props}) {
  const Comp = mobile ? LearningDropdownMobile : LearningDropdownDesktop;
  return <Comp {...props} />;
}
