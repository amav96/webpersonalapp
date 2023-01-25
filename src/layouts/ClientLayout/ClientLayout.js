import React from 'react'
import { Container } from "semantic-ui-react";
import "./ClientLayout.scss";
import { TopBar, Footer } from "../../components/Web"

export  function ClientLayout(props) {
    const { children } = props;
  return (
    <div className="client-layout">
        <div className="client-layout__hedaer">
          <TopBar/>
        </div>
        {children}

        <div className="client-layout__footer">
          <Container>
            <Footer.Info/>
            <Footer.Menu/>
            <Footer.Newsletter/>
          </Container>
          <Container>
            <span>ALL RIGHTS RESERVERD</span>
            <span>Alvaro ALiaga | front end developer</span>
          </Container>
        </div>
    </div>
  )
}
