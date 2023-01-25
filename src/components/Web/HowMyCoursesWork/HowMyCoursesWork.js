import React from 'react';
import { Container, Icon } from "semantic-ui-react";
import { itemsData } from "./HowMyCoursesWork.data"
import "./HowMyCoursesWork.scss"

export function HowMyCoursesWork() {
  return (
    <Container className="how-my-courses-work">
        <h2>¿Como funcionan los cursos?</h2>
        <h4>Cada curso cuenta con contenido multimedia, activa las 24 horas del dia, los 365 dias del año</h4>

        <div className="how-my-courses-work__items">
            {itemsData.map((item,index) => (
                <div key={index}>
                    <div>
                        <Icon name={item.icon}/>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </Container>
  )
}
