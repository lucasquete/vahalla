"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Video01Icon,
  Tv01Icon,
  Home07Icon,
  Search01Icon,
  ComputerVideoIcon,
  Comment02Icon,
  FavouriteIcon
} from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const path = usePathname();
  const separetePath = path.split("/")[1];
  const home = path === "/";
  const movie = separetePath === "movie";
  const serie = separetePath === "serie";
  const search = separetePath === "search";
  const watch = separetePath === "watch";
  const chat = separetePath === "chat";
  const favourite = separetePath === "favoritas";

  const [content, setContent] = useState(null);
  const navbarRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateStateFromStorage = () => {
      const lastWatchedContent = localStorage.getItem("lastWatchedContent");
      if (lastWatchedContent) {
        setContent(JSON.parse(lastWatchedContent));
      }
    };

    updateStateFromStorage();

    const handleStorageChange = (event) => {
      setContent(event.detail);
    };

    window.addEventListener('onLocalStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('onLocalStorageChange', handleStorageChange);
    };
  }, []);

  useEffect(() => {

    if (!isMobileView) {
      return;
    }

    const handleClickOutside = (event) => {
      if (event.target.closest('[data-menu-toggle="true"]')) {
        return;
      }

      if (menuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  const getWatchUrl = () => {
    if (!content || !content.id) {
      return "/";
    }
    if (content.type === "movie") {
      return `/watch/${content.id}?type=movie`;
    } else {
      return `/watch/${content.id}?type=serie&season=${content.season}&episode=${content.episode}&episodeSel=${content.episodeSel}`;
    }
  };

  const handleMenuClose = () => {
    if (!isMobileView) {
      return;
    }
    setMenuOpen(false);
  };

  return (
    <div
      ref={navbarRef}
      className={`flex-1/6 #0d0a1a fixed h-[90vh] top-18 l-0 ${menuOpen ? "w-[200px] lg:w-fit" : "lg:w-[200px] hidden md:flex"
        } flex-col justify-between z-10 bg-[#0d0a1a]`}
    >
      <ul className="flex flex-col text-md font-semibold cursor-pointer">
        <Link
          href={"/"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${home
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            } 
            ${menuOpen ? "md:flex-row lg:flex-col" : "lg:flex-row md:flex-col"}`}
          onClick={handleMenuClose}

        >
          <HugeiconsIcon
            icon={Home07Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${home ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide 
              ${menuOpen ? "lg:hidden" : "md:hidden lg:block"} 
              ${home ? "text-cyan-300" : "text-white"}`}
          >
            Home
          </li>
        </Link>
        <Link
          href={"/movie"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${movie
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={Video01Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${movie ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${movie ? "text-cyan-300" : "text-white"}`}
          >
            Movies
          </li>
        </Link>
        <Link
          href={"/serie"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${serie
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={Tv01Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${serie ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${serie ? "text-cyan-300" : "text-white"}`}
          >
            Series
          </li>
        </Link>
        <Link
          href={getWatchUrl()}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${watch
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={ComputerVideoIcon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${watch ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${watch ? "text-cyan-300" : "text-white"}`}
          >
            Watch
          </li>
        </Link>
        <Link
          href={"/search/a"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${search
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${search ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${search ? "text-cyan-300" : "text-white"}`}
          >
            Search
          </li>
        </Link>
        <Link
          href={"/chat"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${chat
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={Comment02Icon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${chat ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${chat ? "text-cyan-300" : "text-white"}`}
          >
            Chat
          </li>
        </Link>
        <Link
          href={"/favoritas"}
          className={`flex items-center space-x-4 p-3 cursor-pointer transition-all duration-300 border-l-4 ${favourite
            ? "bg-purple-900/50 border-cyan-300"
            : "border-transparent hover:bg-purple-900/30 hover:border-purple-500"
            }`}
          onClick={handleMenuClose}
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={24}
            color="currentColor"
            strokeWidth={2}
            className={` ${favourite ? "text-cyan-300" : "text-white"}`}
          />
          <li
            className={`font-bold font-display tracking-wide ${menuOpen ? "lg:hidden" : "md:hidden lg:block"
              } ${favourite ? "text-cyan-300" : "text-white"}`}
          >
            Favourites
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
