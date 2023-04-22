import HomePostItem from "@/components/post/HomePostItem";
import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const favoritePosts = useSelector((state) => state.post.favoritePosts);
  return (
    <div className="container mx-auto py-8 padding-mobile">
      <h3>Danh sách tin yêu thích</h3>
      {favoritePosts?.length ? (
        <div className="md:grid lg:grid-cols-3 md:grid-cols-2 md:space-x-3">
          {favoritePosts.map((item) => (
            <HomePostItem
              key={item.post.id}
              item={item.post}
              user={item.userFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          Hiện tại, không có tin yêu thích.
        </div>
      )}
    </div>
  );
};

export default Favorites;
