import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import appServices from "../appwrite/config";

const EditPost = () => {
  const [postt, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    appServices.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  return postt ? (
    <div className=" p-y">
      <Container>
        <PostForm post={postt} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
