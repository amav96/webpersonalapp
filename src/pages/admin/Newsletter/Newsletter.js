import React from 'react';
import { Tab } from "semantic-ui-react";
import { ListEmails } from "../../../components/Admin/Newsletter"

export function Newsletter() {

  const panes = [
    {
      // menuItem: "Lista de cursos",
      render: () =>
        <Tab.Pane attached={false}>
          <ListEmails/>
        </Tab.Pane>
    },
  ];
  return (
    <div className='newsletter-page'>
      <Tab menu={{ secondary: true }} panes={panes}/>
    </div>
  )
}
