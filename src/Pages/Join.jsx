import React, { useEffect } from "react";

import PencilIcon from "../assets/PencilIcon.svg";
import user from "../assets/user.svg";
import contract from "../assets/contract.svg";
import noise from "../assets/mainbg.png";
import { useNavigate } from "react-router-dom";

function Join() {
//   useEffect(() => {
//     const session = supabase.auth.session();
//   }, []);
  const navigate = useNavigate();
  const navigateForm = () => {
    // 👇️ navigate to /
    navigate("/check");
  };
  const featureList = [
    {
      icon: PencilIcon,
      heading: "Fill this quick form",
    },
    {
      icon: user,
      heading: "We’ll create your profile on our platform",
    },
    {
      icon: contract,
      heading: "You will receive Deal-flow",
    },
  ];
  return (
    <div className="h-[100vh] w-full">
      {/* <Navbar /> */}
      <div
        className="flex h-full w-full  flex-col items-center bg-surface-BG bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${noise})`,
          backgroundPosition: "center",
        }}
      >
        <div className="mt-16 w-full md:w-1/3 ">
          <h1 className="font-inter text-center text-[2.3rem] font-semibold leading-10 text-[#0F172A] md:text-left md:text-[2.3rem] md:leading-[3rem] md:text-[#0F172A]">
            Join Indian <br className="md:hidden" /> Angel Investors
          </h1>
          <h1 className="font-inter hidden text-start text-[2.2rem] font-semibold leading-[3rem] text-[#0F172A] md:block">
            with Knowledge capital.
          </h1>
          <p className="font-inter mt-4 text-center text-[1rem] font-normal leading-[1.4rem] text-[#48536A] md:text-start md:text-[0.9rem]">
            Take the first step{" "}
            <span className="hidden md:inline">
              in shaping India's entrepreneurial landscape.
            </span>
            Fill out the form below to join Knowledge Capital's network of Angel
            Investors
          </p>
        </div>
        <div className="mb-2 mt-12 ml-[5%] mr-[5%] flex w-[90%] flex-col items-center justify-start rounded-lg border-2 bg-[#fff] md:mb-0 md:ml-[6%] md:mr-0 md:w-[40%]">
          <h3 className="font-inter mt-6 text-center text-[1.19394rem] font-bold leading-[1.4rem] text-[#0F172ABF]">
            Knowledge capital invites you to join
            <br /> Angel investors in India
          </h3>
          <div className=" mt-[5%] ml-2 flex-col md:ml-[-2rem]">
            {featureList.map((feature) => (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A7BE514]">
                  <img src={feature.icon} />
                </div>
                <p className="font-inter text-center text-[0.8rem] font-semibold text-[#48536AC6] md:text-[1.13488rem]">
                  {feature.heading}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={navigateForm}
            className="font-inter mt-12 mb-12 rounded-lg bg-[#0149E4A6] px-4 py-2 text-center text-[0.8rem] text-[#fff]"
          >
            Start here
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default Join;
