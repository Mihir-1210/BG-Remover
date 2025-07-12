import React from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      postUser();
      loadCreditsData();
    }
  }, [isSignedIn])

  const postUser = async () => {
    try {
      let res = await axios.post(`http://localhost:4000/api/user/webhooks`, {
        // data: user, // nathi avto
        // type: "user.created",
        data: {
        id: user.id,
        email_addresses: [{ email_address: user.emailAddresses }],
        first_name: user.firstName,
        last_name: user.lastName,
        image_url: user.imageUrl,
      },
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
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => navigate('/buy')} className="flex items-center gap-2 bg-blue-100 sm:py-2.5 sm:px-7 px-4 py-1.5 rounded-full hover:scale-105 transition-all duration-700">
            <img src={assets.credit_icon} alt="" />
            <p className="text-xs sm:text-sm font-medium text-gray-600">Credits : {credit}</p>
          </button>
          <p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>
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
