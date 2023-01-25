import React, { useState, useEffect } from 'react';
import { Course } from "../../../api";
import { Container, Image, Button } from "semantic-ui-react";
import { image } from ".././../../assets"
import { CourseItem } from "../../../components/Web/CourseItem"
import "./Courses.scss";

const courseController = new Course();

export  function Courses() {

  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const isCurrentLastPage = pagination?.page === pagination?.pages;

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.index({ page, limit: 3 });

        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total
        });
        if(!courses) setCourses(response.docs);
        else setCourses([...courses, ...response.docs]);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [page])

  const changePage = (_, data) => {
    setPage((prevState) => prevState + 1)
  }

  return (
    <Container className="courses-page">
        <Image  src={image.academyLogo} />
        <h2>EN la web vas a encontrar los mejores cursos online de programacion en Español. Unete a nostros y empieza tu camino como programador frontend o backend</h2>

        <div className="courses">
          {courses && courses.map((course) => (
          <div key={course._id} className='courses__item'>
            <CourseItem course={course} />
          </div>
          ))}
        </div>
          {!isCurrentLastPage &&
          <div className="more">
            <Button primary onClick={changePage}>
              Cargar mas...
            </Button>
          </div>
          }
    </Container>
  )
}
