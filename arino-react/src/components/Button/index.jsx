import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Button({
  btnLink,
  btnText,
  variant,
  icon,               // optional override
  iconPosition = 'right', // 'left' or 'right'
}) {
  // default arrows
  const rightArrow = <Icon icon="bi:arrow-right" />;
  const leftArrow  = <Icon icon="bi:arrow-left" />;

  // choose icon: explicit icon prop wins,
  // otherwise pick based on position
  const chosenIcon = icon
    ? icon
    : iconPosition === 'left'
      ? leftArrow
      : rightArrow;

  return (
    <Link
      to={btnLink}
      className={
        variant
          ? `cs-text_btn ${variant}`    // ← backticks around the template literal
          : 'cs-text_btn'
      }
    >
     {iconPosition === 'left' && <span className="cs-icon">{chosenIcon}</span>}
                    <span className="cs-btn-text">{btnText}</span>
      {iconPosition === 'right' && <span className="cs-icon">{chosenIcon}</span>}
    </Link>
  );
}