import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function MyProfile() {
    const session = await getServerSession(authOptions);
    const user = session?.user
    // const [dbUser, setDbUser] = useState()
    // useEffect(() => {
    //     axios.get(`https://dream-dwellings-server.vercel.app/user?email=${user?.email}`)
    //         .then(res => {
    //             setDbUser(res.data)
    //         })
    // }, [user])

    return (
        <div className="text-center bg-gradient-to-br from-teal-500 to-[#0060f0] bg-opacity-20 rounded-lg p-6 flex justify-center">
            <div className="space-y-4">
                <div className="w-24 rounded-3xl overflow-hidden">
                    <img src={user?.image || undefined} alt="user" />
                </div>
                <h2 className="font-bold text-2xl text-white">Name: {user?.name}</h2>
                <h2 className="font-bold text-white">Role: {user?.role}</h2>
            </div>
        </div>
    )
}
