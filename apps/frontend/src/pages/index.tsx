import type { NextPage } from "next";
<<<<<<< HEAD
import { JSX, SVGProps, useState} from "react";
=======
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
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b

const Home: NextPage = () => {
  interface Meme {
    id: number;
    title: string;
    imgSrc: string;
    votes: number;
  }

  const memeData = [
    {id: 1, title: "Doge Coin Meme", imgSrc: "/placeholder.svg", votes: 42},
    {id: 2, title: "Ape NFT Meme", imgSrc: "/placeholder.svg", votes: 28},
    {
      id: 3,
      title: "Crypto Punks Meme",
      imgSrc: "/placeholder.svg",
      votes: 19,
    },
<<<<<<< HEAD
    {id: 4, title: "Ethereum Meme", imgSrc: "/placeholder.svg", votes: 14},
    {id: 5, title: "Solana Meme", imgSrc: "/placeholder.svg", votes: 9},
    {id: 6, title: "Bored Ape Meme", imgSrc: "/placeholder.svg", votes: 6},
=======
    { id: 4, title: "Ethereum Meme", imgSrc: "/placeholder.svg", votes: 14 },
    { id: 5, title: "Solana Meme", imgSrc: "/placeholder.svg", votes: 9 },
    { id: 6, title: "Bored Ape Meme", imgSrc: "/placeholder.svg", votes: 6 },
    { id: 7, title: "1 Meme", imgSrc: "/placeholder.svg", votes: 5 },
    { id: 8, title: "Daniel Stinkt", imgSrc: "/placeholder.svg", votes: 204 },
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b
  ];
  const [menu, setMenu] = useState<{ visible: boolean; id: number | null }>({
    visible: false,
    id: null,
  });
  const [selectedMeme, setSelectedMeme] = useState<Meme>();
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const handleCryptoChange = (value: any) => {
    setSelectedCrypto(value);
    setAmount("");
  };
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: number) => {
    const meme = memeData.find((m) => m.id === id);
    setSelectedMeme(meme);
    setMenu({
      visible: true,
      id,
    });
  };

  const handleMenuClose = () => {
    setMenu({
      visible: false,
      id: null,
    });
    setSelectedMeme(undefined);
  };

<<<<<<< HEAD
  const Menu = ({meme, onClose}: { meme: any; onClose: () => void }) => (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
          <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
          >
            Close
          </button>
          <img
              src={meme.imgSrc}
              alt={meme.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            {meme.title}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                <ArrowUpIcon className="w-5 h-5"/>
              </button>
              <span className="text-gray-700 dark:text-gray-300">
=======
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

  const Menu = ({ meme, onClose }: { meme: any; onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
        >
          Close
        </button>
        <img
          src={meme.imgSrc}
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
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b
              {meme.votes}
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
<<<<<<< HEAD
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Web3 Meme Collection
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Explore our collection of the best Web3 memes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memeData.map((meme) => (
              <div
                  key={meme.id}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleCardClick(meme.id)}
              >
                <img
                    src={meme.imgSrc}
                    alt={meme.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {meme.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                        <ArrowUpIcon className="w-5 h-5"/>
                      </button>
                      <span className="text-gray-700 dark:text-gray-300">
=======
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
        {memeData.map((meme) => (
          <div
            key={meme.id}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCardClick(meme.id)}
          >
            <img
              src={meme.imgSrc}
              alt={meme.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {meme.title}
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                    <ArrowUpIcon className="w-5 h-5" />
                  </button>
                  <span className="text-gray-700 dark:text-gray-300">
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b
                    {meme.votes}
                  </span>
                      <button
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                        <ArrowDownIcon className="w-5 h-5"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
        {menu.visible && selectedMeme && (
            <Menu meme={selectedMeme} onClose={handleMenuClose}/>
        )}
      </div>
  );
};

export default Home;

<<<<<<< HEAD
function ArrowDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
=======
function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b
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

<<<<<<< HEAD
function ArrowUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
=======
function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
>>>>>>> 6ba3b2c257608be2a7fcbbc4207b9d7e6a04b26b
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
