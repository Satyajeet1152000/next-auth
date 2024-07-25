import CardWrapper from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Opps! Something went wrong."
            backButtonLabel="Back to Login"
            bacButtonHref="/auth/login"
        >
            <div className=" w-full flex items-center justify-center">
                <ExclamationTriangleIcon className=" text-destructive" />
            </div>
        </CardWrapper>
    );
};

export default ErrorCard;
