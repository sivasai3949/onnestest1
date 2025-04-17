import React from 'react'
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget() {
  return (
    <Div className="cs-social_btns cs-style1">
      <a href="https://www.linkedin.com/company/onnes-cryogenics/" className="cs-center" target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:linkedin-in" />
      </a>
      <a href="https://www.instagram.com/onnes.cryogenics/" className="cs-center" target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:instagram" />
      </a>
      <a href="https://www.facebook.com/onnescryogenics" className="cs-center" target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:facebook-f" />
      </a>
      <a href="https://twitter.com/i/flow/login?redirect_after_login=%2FOCryogenics" className="cs-center" target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:twitter" />
      </a>
    </Div>
  )
}
