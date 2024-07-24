import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const SettingPage = () => {
    return (
        <div>
            Setting Page
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">SignOut</button>
            </form>
        </div>
    );
};

export default SettingPage;
