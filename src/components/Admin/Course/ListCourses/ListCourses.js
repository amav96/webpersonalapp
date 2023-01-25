import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Course } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss"

const courseController = new Course();

export  function ListCourses(props) {
  const {reload, onReload} = props;
  const [courses, setCourses] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.index({ page, limit: 3});
        setCourses(response.docs)
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total
        });
      } catch (error) {
        console.log(error);
      }
    })()
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage)
  }

  if(!courses) return <Loader active inline="centered" />
  if(size(courses) === 0) return "No hay ningun curso";

  return (
    <div className='list-courses'>
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} onReload={onReload} />
      ))}

      <div className='list-courses__pagination'>
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  )
}
