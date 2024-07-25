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
            access_key: "7d7b24a3-6e4f-42a5-afc2-973ab8f205a6",
            // name: formData,
            email,
            message: `Click on below link to verify email. \n ${confirmLink}`,
            from_name: "Project Next-Auth",
            subject: "Confirm your email.",
        }),
    });
};
