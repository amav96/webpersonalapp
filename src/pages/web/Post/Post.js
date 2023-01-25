import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react"
import "./Post.scss";
import { Post as PostController } from "../../../api"

const postController = new PostController();

export  function Post() {
  const [post, setPost] = useState(null);
  const { path } = useParams();

  useEffect(() => {
    (async () => {
      const response = await postController.show(
        path
      );
      setPost(response);
    })()
  }, [path]);

  if(!post) return <Loader active inline="centered"/>

  return (
    <Container className="post">
      <h1> {post.title} </h1>

      <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}>

      </div>
    </Container>
  )
}
