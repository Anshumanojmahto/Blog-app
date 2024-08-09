import React, { useEffect, useState } from "react";
import appServices from "../appwrite/config";
import { Container, PostCard } from "../components";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appServices.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [setPosts]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap min-h-[20rem]">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500 py-24">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-2 p-1">
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

export default HomePage;
