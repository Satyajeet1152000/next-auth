"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonprops {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
}: LoginButtonprops) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    };
    return (
        <span onClick={onClick} className=" cursor-pointer">
            {children}
        </span>
    );
};

export default LoginButton;
