import React from 'react';
import { Button } from "semantic-ui-react";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils"
import "./Info.scss";

export  function Info() {
  return (
    <div className="footer-info">
        <Icon.LogoWhite className="logo"/>
        <p>Entra en el mundo del desarro web para que ganes una banda de guita</p>
        {socialData.map((social) => (
            <Button
            key={social.type}
            as="a"
            target="_blank"
            href={social.type}
            color={social.type}
            icon={social.type}
            />
        ))}
    </div>
  )
}
