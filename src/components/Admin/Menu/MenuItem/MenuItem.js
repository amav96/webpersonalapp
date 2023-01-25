import React, { useState } from 'react';
import "./MenuItem.scss";
import { Button, Icon, Confirm } from "semantic-ui-react"
import { BasicModal } from "../../../Shared";
import {  Menu } from "../../../../api";
import {  useAuth  } from "../../../../hooks";
import { MenuForm } from "../MenuForm";

const menuController = new Menu();

export  function MenuItem(props) {
    const { menu, onReload } =  props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState(false);

    const onOpenClosModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onOpenUpdateMenu = () => {
        setTitleModal(`Actualizar menu: ${menu.title}`)
        onOpenClosModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(
            menu.active ? `Desactivar ${menu.title}` : `Activar ${menu.title}`
        )
        onOpenCloseConfirm();
    }

    const onActivateDesactivate = async () => {
        try {
            await menuController.update(accessToken, menu._id, {
                active: !menu.active
            })
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.log(error)
        }
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar el menu ${menu.title}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await menuController.remove(accessToken, menu._id);
            onReload();
            onOpenCloseConfirm();

        } catch (error) {
            console.log(error)
        }
    }


    return (
    <>
        <div className="menu-item">
            <div className="menu-item__info">
                <span className="menu-item__info-title">
                    {menu.title}
                </span>
                <span className="menu-item__info-path">
                    {menu.path}
                </span>
            </div>

            <div>
                <Button icon primary onClick={onOpenUpdateMenu}>
                    <Icon name="pencil"/>
                </Button>
                <Button icon color={menu.active ? 'orange' : 'teal'} onClick={openDesactivateActivateConfirm}>
                    <Icon name={menu.active ? 'ban' : 'check'}/>
                </Button>
                <Button icon color="red" onClick={openDeleteConfirm}>
                    <Icon name="trash"/>
                </Button>
            </div>
        </div>

        <BasicModal
        show={showModal}
        close={onOpenClosModal}
        title={titleModal}
        >
            <MenuForm
            onClose={onOpenClosModal}
            onReload={onReload}
            menu={menu}
            />
        </BasicModal>

        <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
        />
    </>
  )
}
