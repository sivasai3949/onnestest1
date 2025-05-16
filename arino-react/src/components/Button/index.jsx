import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Button({
  btnLink,
  btnText,
  variant,
  icon, // optional override
  iconPosition = 'right',
}) {
  // Set default icon based on text or position
  let chosenIcon;

  if (icon) {
    chosenIcon = icon;
  } else if (btnText.toLowerCase().includes('previous')) {
    chosenIcon = <Icon icon="bi:arrow-left" />;
  } else if (btnText.toLowerCase().includes('next')) {
    chosenIcon = <Icon icon="bi:arrow-right" />;
  } else {
    chosenIcon = iconPosition === 'left'
      ? <Icon icon="bi:arrow-left" />
      : <Icon icon="bi:arrow-right" />;
  }

  return (
    <Link
      to={btnLink}
      className={
        variant
          ? `cs-text_btn ${variant}`
          : 'cs-text_btn'
      }
    >
      {iconPosition === 'left' && <span className="cs-icon">{chosenIcon}</span>}
      <span className="cs-btn-text">{btnText}</span>
      {iconPosition === 'right' && <span className="cs-icon">{chosenIcon}</span>}
    </Link>
  );
}
