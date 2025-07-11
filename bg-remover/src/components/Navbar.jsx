import React from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn])

  const postUser = async () => {
    try {
      let res = await axios.post(`http://localhost:4000/api/user/webhooks`, {
        data: user, // nathi avto
        type: "user.created",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center mx-4 py-3 lg:mx-44">
      <Link to="/">
        <img src={assets.logo} className="w-32 sm:w-44" alt="" />
      </Link>
      { isSignedIn ? (
        <div>
          <button>
            <img src={assets.credit_icon} alt="" />
            <p>Credits : {credit}</p>
          </button>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => {
            openSignIn({});
            postUser();
          }}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get started{" "}
          <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
