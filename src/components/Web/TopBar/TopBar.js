import React, { useState, useEffect } from 'react';
import { Container, Button} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Icon } from "../../../assets";
import { Menu } from "../../../api"
import { socialData } from "../../../utils"
import "./TopBar.scss";

const menuController = new Menu();

export function TopBar() {

    const [menus, setMenus] = useState(null);
    useEffect(() => {
      (async () => {
        try {
            const response = await menuController.index(true);
            setMenus(response);
        } catch (error) {
            console.log(error);
        }
      })()
    }, [])
    
    if(!menus) return ''
  return (
    <div className='top-bar'>
        <Container>
            <div className='top-bar__left'>
                <Link to="/" className="logo">
                    <Icon.LogoWhite/>
                </Link>

                <div className='menu'>
                    {menus.map((menu) => (
                        <a key={menu._id}  href={menu.path}>
                            {menu.title}
                        </a>
                    ))}
                </div>
            </div>

            <div>
                {socialData.map((social) => (
                    <Button
                    key={social.type}
                    as="a"
                    target="_blank"
                    href={social.link}
                    color={social.type}
                    icon={social.type}
                    />
                ))}
            </div>
        </Container>
    </div>
  )
}
