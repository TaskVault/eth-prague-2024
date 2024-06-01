import type { NextPage } from "next";
import { JSX, SVGProps, useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePosts } from "@/lib/usePosts";
import { iMeme } from "./createMeme";

const Home = () => {

  const [menu, setMenu] = useState<{ visible: boolean; id?: string | number }>({
    visible: false
  });
  const [selectedMeme, setSelectedMeme] = useState<iMeme>();
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const handleCryptoChange = (value: any) => {
    setSelectedCrypto(value);
    setAmount("");
  };
  const handleDBCardClick = (id: string) => {
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
  }

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

  const { createPost, posts } = usePosts();
  const Menu = ({ meme, onClose }: { meme: iMeme; onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
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
        />
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {meme.title}
        </h2>
        <div className="flex items-center gap-4 w-full max-w-md">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedCrypto} onValueChange={handleCryptoChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Crypto" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Popular</SelectLabel>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="solana">Solana (SOL)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Other</SelectLabel>
                <SelectItem value="litecoin">Litecoin (LTC)</SelectItem>
                <SelectItem value="ripple">Ripple (XRP)</SelectItem>
                <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              <ArrowUpIcon className="w-5 h-5" />
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              {meme.likes}
            </span>
              <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                <ArrowDownIcon className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
  );

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
        {posts.data && posts.data.map((post) => (
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
