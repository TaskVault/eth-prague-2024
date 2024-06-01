import { JSX, SVGProps, useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { usePosts } from "@/lib/usePosts";
import { iMeme } from "./createMeme";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [menu, setMenu] = useState<{ visible: boolean; id?: string | number }>({
    visible: false,
  });
  const [selectedMeme, setSelectedMeme] = useState<iMeme>();
  const handleDBCardClick = (id: string) => {
    console.log(posts.data);
    if (!posts.data) return;
    const meme = posts.data.find((m) => m.id === id);
    if (!meme) return;
    const cur: iMeme = {
      id: meme.id,
      title: meme.title,
      imageUrl: meme.image,
      description: meme.description || "AAA",
      subTitle: "Hardcoded Subtitle",
    };
    setSelectedMeme(cur);
    setMenu({
      visible: true,
      id: id,
    });
  };

  const handleMenuClose = () => {
    setMenu({
      visible: false,
      id: undefined,
    });
    setSelectedMeme(undefined);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleMenuClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const { createPost, posts, likePost, dislikePost } = usePosts();
  const Menu = ({ meme, onClose }: { meme: iMeme; onClose: () => void }) => {
    const likePostAction = async (postId: string,) => {
      // Commentor ID hardcoded
      const userId = "766b287e-cf55-4ee0-956b-9b010dc9400e";
      const res = await likePost.mutateAsync({
        postId,
        userId,
      });
      console.log(res);
    };
    const dislikePostAction = async (postId: string) => {
      // Commentor ID hardcoded
      const userId = "766b287e-cf55-4ee0-956b-9b010dc9400e";
      const res = await dislikePost.mutateAsync({
        postId,
        userId,
      });
      console.log(res);
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 m-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
          >
            Close
          </button>
          <img
            src={meme.imageUrl}
            alt={meme.title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
            width={400}
            height={300}
          />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            {meme.title}
          </h2>
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              {meme.description}
            </p>
          </div>
          <div className="flex items-center gap-4 w-full max-w-md"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={ () => likePostAction(meme.id ?? "") } className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                <ArrowUpIcon className="w-5 h-5" />
              </button>
              <span className="text-gray-700 dark:text-gray-300">
                {meme.likes}
              </span>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                <ArrowDownIcon onClick={() => dislikePostAction(meme.id ?? "")} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          Degens for Future
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Ape around and do something gud
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.data &&
          posts.data.map((post) => (
            <Card
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleDBCardClick(post.id)}
            >
              <img
                src={post.image}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {post.title}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                      <ArrowUpIcon className="w-5 h-5" />
                    </button>
                    <span className="text-gray-700 dark:text-gray-300">
                      {post.likes}
                    </span>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                      <ArrowDownIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      {menu.visible && selectedMeme && (
        <Menu meme={selectedMeme} onClose={handleMenuClose} />
      )}
    </div>
  );
};

export default Home;

function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
