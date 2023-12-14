import React from "react";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState, useContext } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function HamburgerMenu() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);

  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  const handleLogout = () => {
    logOutUser();
    setDropdownOpen(false);
  };

  return (
    <div ref={ref} className="lg:hidden md:hidden pt-2 flex justify-end">
      <Hamburger toggled={isOpen} size={20} toggle={() => setOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-slate-800 text-white ">
              <ul className="grid gap-2">
                <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                  <HashLink to={"/#about-us"}>About Us</HashLink>
                </li>
                <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                  <HashLink to={"/#contact"}>Contact</HashLink>
                </li>

                {!isLoggedIn && (
                  <>
                    <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                      <Link to={"/login"}>Login</Link>
                    </li>
                    <li className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all">
                      <Link to={"/signup"}>SignUp</Link>
                    </li>
                  </>
                )}

                {isLoggedIn && (
                  <ul>
                    <Link to={"/curriculum"}>
                      <li className="list-none flex items-center mb-2 gap-1 hover:text-neutral-400 transition-all">
                        Create New CV
                      </li>
                    </Link>
                    <Link to={"/my-curriculums"}>
                      <li className="list-none flex items-center gap-1 mb-2 hover:text-neutral-400 transition-all">
                        My Curriculums
                      </li>
                    </Link>
                    {logOutUser && (
                      <li
                        onClick={handleLogout}
                        className="list-none flex items-center gap-1 hover:text-neutral-400 transition-all"
                      >
                        Logout
                      </li>
                    )}
                  </ul>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HamburgerMenu;
