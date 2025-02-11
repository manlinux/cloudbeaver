/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { observer } from 'mobx-react-lite';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Icon, IconOrImage, Loader, s, useS, useStateDelay, useTranslate } from '@cloudbeaver/core-blocks';

import style from './MenuBarItem.module.css';

interface Props extends Omit<React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'style'> {
  label?: string;
  /** @deprecated must be refactored (#1)*/
  displayLabel?: boolean;
  loading?: boolean;
  hidden?: boolean;
  icon?: string | React.ReactNode;
  displaySubmenuMark?: boolean;
  viewBox?: string;
}

export const MenuBarItem = observer<Props, HTMLButtonElement>(
  forwardRef(function MenuBarItem(
    { label, displayLabel = true, loading = false, hidden, icon, displaySubmenuMark, viewBox = '0 0 24 24', className, ...rest },
    ref,
  ) {
    const styles = useS(style);
    const translate = useTranslate();
    loading = useStateDelay(loading, 100);

    const title = translate(rest.title);
    return (
      <button ref={ref} className={s(styles, { menuBarItem: true, hidden }, className)} {...rest} title={title} aria-label={title}>
        <div className={s(styles, { menuBarItemBox: true })}>
          {loading ? (
            <div className={s(styles, { menuBarItemIcon: true })}>
              <Loader className={s(styles, { loader: true })} small fullSize />
            </div>
          ) : (
            icon && (
              <div className={s(styles, { menuBarItemIcon: true })}>
                <Loader className={s(styles, { loader: true })} suspense small fullSize>
                  {typeof icon === 'string' ? <IconOrImage className={s(styles, { iconOrImage: true })} icon={icon} viewBox={viewBox} /> : icon}
                </Loader>
              </div>
            )
          )}
          {label && displayLabel && <div className={s(styles, { menuBarItemLabel: true })}>{translate(label)}</div>}
          {displaySubmenuMark && (
            <div className={s(styles, { menuBarItemMark: true })}>
              <Icon className={s(styles, { icon: true }, className)} name="angle" viewBox="0 0 15 8" />
            </div>
          )}
        </div>
      </button>
    );
  }),
);
