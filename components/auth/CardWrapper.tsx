"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import Header from "./Header";
import Social from "./Social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    bacButtonHref: string;
    showSocial?: boolean;
}
const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    bacButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className=" w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter className="flex items-center justify-center">
                <BackButton href={bacButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
