import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

const PostCard = ({ $id, title, featureimg }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-zinc-300 text-black rounded-xl p-2">
        <div className="w-full justify-center mb-2">
          <img
            className="rounded-xl"
            src={storageService.getFilePreview(featureimg)}
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
