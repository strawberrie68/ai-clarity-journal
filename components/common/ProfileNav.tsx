import Image from "next/image";
import { useRouter } from "next/router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"



const ProfileNav = () => {
    const router = useRouter()

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        router.push("/login")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image
                    src="/user-profile.png"
                    alt="user profile"
                    width={44}
                    height={44}
                    className="min-h-11 min-w-11"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileNav