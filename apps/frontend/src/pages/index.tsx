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

const Home = () => {
  interface Meme {
    id: number;
    title: string;
    imgSrc: string;
    votes: number;
  }
  const bestMemeData = [
    {
        id: 1,
        title: "PuppyBarks",
        subtitle: "Bark Your Way to Prosperity with PuppyBarks!",
        description: "PuppyBarks is an energetic new meme coin on the Solana network that symbolizes the playful yet powerful spirit of puppies. With an emphasis on community engagement and fun, PuppyBarks aims to create a lively and supportive ecosystem. Investors can participate in unique staking opportunities and community-driven events, making each bark count. Join the PuppyBarks pack and explore a world where every bark brings you closer to financial freedom.",
        imgSrc: "/placeholder.svg",
        votes: 42
    },
    {
        id: 2,
        title: "CryptoCorgi",
        subtitle: "Join the Corgi Craze with CryptoCorgi!",
        description: "CryptoCorgi combines the adorable charm of corgis with the cutting-edge technology of the Solana blockchain. This meme coin offers a unique blend of humor and utility, with features like community voting on project developments and fun NFT drops. The CryptoCorgi community is a vibrant space for dog lovers and crypto enthusiasts alike, where the spirit of the corgi drives innovation and growth. Embrace the future with CryptoCorgi and let your investments wag with joy.",
        imgSrc: "/placeholder.svg",
        votes: 38
    },
    {
        id: 3,
        title: "KittenKash",
        subtitle: "Play and Prosper with KittenKash!",
        description: "KittenKash is a charming meme coin that combines the playful nature of kittens with the potential for financial prosperity on the Solana blockchain. With community-focused events and interactive staking options, KittenKash offers a fun and engaging way to grow your investments. The project’s community is welcoming and supportive, creating a cozy environment for all members. Join KittenKash and let your investments playfully grow.",
        imgSrc: "/placeholder.svg",
        votes: 35
    },
    {
        id: 4,
        title: "MeowMoney",
        subtitle: "Refine Your Wealth with MeowMoney!",
        description: "MeowMoney is a refined meme coin that brings the elegance and sophistication of cats to the world of finance on the Solana blockchain. With a focus on high-end investment strategies and exclusive community events, MeowMoney offers a luxurious way to grow your wealth. The project’s community is distinguished and knowledgeable, providing valuable insights and opportunities. Join MeowMoney and elevate your financial journey with a touch of class.",
        imgSrc: "/placeholder.svg",
        votes: 37
    },
    {
        id: 5,
        title: "ElephantEarn",
        subtitle: "Giant Gains with ElephantEarn!",
        description: "ElephantEarn is a meme coin inspired by the strength and wisdom of elephants, designed to help you achieve giant gains on the Solana network. With a focus on community-driven growth and long-term stability, ElephantEarn provides unique staking opportunities and fun community events. The project fosters a sense of wisdom and strength, making each investment a journey towards financial prosperity. Embrace the power of ElephantEarn and achieve monumental gains.",
        imgSrc: "/placeholder.svg",
        votes: 40
    },
    {
        id: 6,
        title: "GiraffeGold",
        subtitle: "Reach New Heights with GiraffeGold!",
        description: "GiraffeGold is a meme coin that combines the elegance and height of giraffes with the potential for financial growth on the Solana blockchain. With a focus on high-reaching investment strategies and community engagement, GiraffeGold aims to elevate your wealth to new heights. The project’s community is supportive and ambitious, providing valuable insights and opportunities for growth. Join GiraffeGold and stretch your investments towards the sky.",
        imgSrc: "/placeholder.svg",
        votes: 39
    },
    {
        id: 7,
        title: "PhoenixPurse",
        subtitle: "Rise to Riches with PhoenixPurse!",
        description: "PhoenixPurse is a mythical meme coin that symbolizes rebirth and renewal, offering a pathway to riches on the Solana blockchain. With a focus on innovative staking options and community-driven growth, PhoenixPurse aims to provide a transformative financial experience. The project’s community is resilient and supportive, fostering a sense of rebirth and new beginnings. Embrace the power of the phoenix and rise to riches with PhoenixPurse.",
        imgSrc: "/placeholder.svg",
        votes: 43
    },
    {
        id: 8,
        title: "UnicornUplift",
        subtitle: "Magical Growth with UnicornUplift!",
        description: "UnicornUplift is a whimsical meme coin that combines the magic of unicorns with the potential for financial growth on the Solana blockchain. With a focus on magical investment strategies and community engagement, UnicornUplift aims to provide a delightful financial journey. The project’s community is vibrant and supportive, offering a magical experience for all members. Join UnicornUplift and let your investments soar to magical heights.",
        imgSrc: "/placeholder.svg",
        votes: 44
    },
    {
        id: 9,
        title: "AlienAssets",
        subtitle: "Explore New Wealth with AlienAssets!",
        description: "AlienAssets is a themed meme coin that invites you to explore new realms of wealth on the Solana blockchain. With a focus on interstellar investment strategies and community-driven growth, AlienAssets aims to provide an out-of-this-world financial experience. The project’s community is adventurous and supportive, offering unique opportunities for growth. Join AlienAssets and explore new wealth beyond the stars.",
        imgSrc: "/placeholder.svg",
        votes: 41
    },
    {
        id: 10,
        title: "RobotRiches",
        subtitle: "Automate Your Wealth with RobotRiches!",
        description: "RobotRiches is a themed meme coin that combines the efficiency and precision of robots with the potential for automated wealth on the Solana blockchain. With a focus on automated investment strategies and community engagement, RobotRiches aims to provide a seamless financial experience. The project’s community is tech-savvy and supportive, offering innovative opportunities for growth. Join RobotRiches and automate your wealth towards financial success.",
        imgSrc: "/placeholder.svg",
        votes: 40
    }
];

  const memeData = [
    {
      id: 1,
      title: "Doge Coin Meme",
      subtitle: "subtitle",
      description: "description", 
      imgSrc: "/placeholder.svg", 
      votes: 42 },
    { id: 2, title: "Ape NFT Meme", imgSrc: "/placeholder.svg", votes: 28 },
    {
      id: 3,
      title: "Crypto Punks Meme",
      imgSrc: "/placeholder.svg",
      votes: 19,
    },
    { id: 4, title: "Ethereum Meme", imgSrc: "/placeholder.svg", votes: 14 },
    { id: 5, title: "Solana Meme", imgSrc: "/placeholder.svg", votes: 9 },
    { id: 6, title: "Bored Ape Meme", imgSrc: "/placeholder.svg", votes: 6 },
    { id: 7, title: "1 Meme", imgSrc: "/placeholder.svg", votes: 5 },
    { id: 8, title: "Daniel Stinkt", imgSrc: "/placeholder.svg", votes: 204 },
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
