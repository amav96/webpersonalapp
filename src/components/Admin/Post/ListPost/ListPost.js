import React, { useState, useEffect } from 'react';
import {size} from "lodash"
import { Loader, Pagination } from "semantic-ui-react"
import "./ListPost.scss";
import { Post } from "../../../../api";
import { PostItem } from "../PostItem";

const postController = new Post();

export function ListPost(props) {
    const { reload, onReload } = props;

    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
      ( async () => {
            try {
                const response = await postController.index({page, limit:3});
                setPosts(response.docs);
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

  if(!posts) return <Loader active inline="centered"/>
  if(size(posts) === 0) return "No hay ningun post"

  return (
    <div className="list-post">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onReload={onReload}/>
      ))}

    <div className='list-post__pagination'>
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
