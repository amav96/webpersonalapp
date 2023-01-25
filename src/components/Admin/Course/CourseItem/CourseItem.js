import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { CourseForm } from "../CourseForm"
import "./CourseItem.scss";
import { ENV } from "../../../../utils";
import { Course } from  "../../../../api";
import { useAuth } from "../../../../hooks";

const courseController = new Course();

export function CourseItem(props) {
    const { course, onReload } = props;
    const { accessToken } = useAuth();


    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const onDelete = async () => {
        try {
            await courseController.remove(accessToken, course._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.log(error);
        }
    }

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const openUpdateCourse = () => {
        setTitleModal(`Actualizar ${course.title}`)
        onOpenCloseModal();
    }

  return (
    <>
    <div className="course-item">
        <div className="course-item__info">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`}/>
            <div>
                <p>{course.title}</p>
            </div>
        </div>

        <div>
            <Button icon as="a" href={course.url} target="_blank">
                <Icon name="eye"/>
            </Button>
            <Button icon primary onClick={openUpdateCourse}>
                <Icon name="pencil"/>
            </Button>
            <Button icon color="red" onClick={onOpenCloseConfirm} >
                <Icon name="trash"/>
            </Button>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal} >
            <CourseForm
            onClose={onOpenCloseModal}
            onReload={onReload}
            course={course}
            />
        </BasicModal>

        <Confirm
         open={showConfirm}
         onCancel={onOpenCloseConfirm}
         onConfirm={onDelete}
         content={`Eliminar el curso ${course.title}`}
         size="mini"
        />
    </div>
    </>
  )
}
