import React, { useState, useEffect }  from 'react'
import { Menu } from "../../../../api";
import {size } from "lodash";
import { Loader } from "semantic-ui-react"
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu(props) {
    const {active, reload, onReload} = props;
    const [menus, setMenus] = useState(null);
    useEffect(() => {
      (async () => {
        try {
            setMenus(null);
            const response = await menuController.index(active);
            setMenus(response);
          } catch (error) {
            console.log(error)
          }
      })()
    }, [active, reload]);

    if(!menus) return <Loader active inline="centered"/>
    if(size(menus) === 0) return "No hay ningun menu"

  return menus.map((menu) => <MenuItem key={menu._id} menu={menu} onReload={onReload} />)
}
