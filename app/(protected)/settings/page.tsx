import { auth, signOut } from "@/auth";

const SettingPage = async () => {
    const session = await auth();

    return (
        <div>
            Setting Page
            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/auth/login" });
                }}
            >
                <button type="submit">SignOut</button>
            </form>
            {JSON.stringify(session)}
        </div>
    );
};

export default SettingPage;
