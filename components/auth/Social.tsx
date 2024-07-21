"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const Social = () => {
    return (
        <div className=" flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                className=" w-full border-slate-300 shadow-lg"
                variant={"outline"}
            >
                <FcGoogle className=" h-5 w-5" />
            </Button>
            <Button
                size={"lg"}
                className=" w-full border-slate-300 shadow-lg"
                variant={"outline"}
            >
                <FaGithub className=" h-5 w-5" />
            </Button>
        </div>
    );
};

export default Social;
