import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appServices from "../appwrite/config";
import storageService from "../appwrite/storage";
import { Link, useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { Button, Container } from "../components";

const Post = () => {
  const [postt, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = postt && userData ? postt.userid === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appServices.deletePost(postt.$id).then((status) => {
      if (status) {
        storageService.deleteFile(postt.featureimg);
        navigate("/");
      }
    });
  };

  return postt ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getFilePreview(postt.featureimg)}
            alt={postt.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${postt.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{postt.title}</h1>
        </div>
        <div className="browser-css">{parse(postt.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
