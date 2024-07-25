"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { emailVerification } from "@/actions/auth/emailVerification";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";

const EmailVerificationForm = () => {
    const searchParama = useSearchParams();
    const token = searchParama.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing Token");
            return;
        }

        emailVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong.");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirm you verification"
            backButtonLabel="Back to Login"
            bacButtonHref="/auth/login"
        >
            <div className=" flex items-center justify-center w-full">
                <BeatLoader
                    speedMultiplier={0.5}
                    loading={!success && !error}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    );
};

export default EmailVerificationForm;
