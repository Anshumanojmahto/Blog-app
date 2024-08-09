import React, { useState, useEffect } from "react";
import appServices from "../appwrite/config";
import { Container, PostCard } from "../components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appServices.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="py-8  ">
      <Container>
        <div className="flex min-h-[25rem] flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/3">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
