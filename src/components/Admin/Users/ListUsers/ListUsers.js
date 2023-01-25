import React, { useState, useEffect } from 'react'
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks"
import { UserItem } from "../UserItem"

const userController = new User();

export function ListUsers(props) {
    const { usersActive, reload, onReload } = props;
    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const response= await userController.index(accessToken, usersActive);
                setUsers(response);

            } catch (error) {

            }
        })()

    }, [usersActive, reload])

    if(!users) return <Loader active inline="centered"/>
    if(size(users) === 0) return "No hay usuarios";

  return users.map((user) =>
    <UserItem
    key={user._id}
    user={user}
    onReload={onReload}
    />
  )
}
