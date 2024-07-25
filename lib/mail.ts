export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.HOSTNAME}/auth/email-verification?token=${token}`;

    // we can use Resend to send email and more if we have domain name instead of web3form free email sender.
    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: process.env.EMAIL_SENDER_API,
            // name: formData,
            email,
            message: `Click on below link to verify email. \n ${confirmLink}`,
            from_name: "Project Next-Auth",
            subject: "Confirm your email.",
        }),
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.HOSTNAME}/auth/new-password?token=${token}`;

    // we can use Resend to send email and more if we have domain name instead of web3form free email sender.
    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: process.env.EMAIL_SENDER_API,
            // name: formData,
            email,
            message: `Click on below link to reset password. \n ${resetLink}`,
            from_name: "Project Next-Auth",
            subject: "Reset your password.",
        }),
    });
};
