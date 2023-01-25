import React, { useState } from 'react'
import { Tab, Button } from "semantic-ui-react"
import { BasicModal } from "../../../components/Shared";
import { ListCourses, CourseForm } from "../../../components/Admin/Course"
import "./Courses.scss";

export  function Courses() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false)

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      // menuItem: "Lista de cursos",
      render: () =>
        <Tab.Pane attached={false}>
          <ListCourses reload={reload} onReload={onReload}/>
        </Tab.Pane>
    },
  ];

  return (
    <>
      <div className="courses-page">
        <Button className="courses-page__add" primary onClick={onOpenCloseModal} >
          Nuevo curso
        </Button>

        <Tab menu={{ secondary: true }} panes={panes}/>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear curso">
        <CourseForm onClose={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
