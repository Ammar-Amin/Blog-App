import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Container, PostCard, MasonryGrid } from "../components";
import postService from "../appwrite/post";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    postService
      .getPosts([Query.equal("status", "active")])
      .then((posts) => {
        // getPosts swallows failures and resolves to false.
        if (posts) {
          setAllPosts(posts.documents);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch((e) => {
        console.log("Home page Error :: all Posts :", e);
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="w-full h-[400px] relative">
        <div class="banter-loader">
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white">
              Couldn&apos;t load posts
            </h1>
            <p className="mt-2 text-zinc-400">
              Something went wrong reaching the server. Please try again.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white">No posts yet</h1>
            <p className="mt-2 text-zinc-400">
              Once someone publishes a post it will show up here.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <MasonryGrid>
          {allPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </MasonryGrid>
      </Container>
    </div>
  );
}
