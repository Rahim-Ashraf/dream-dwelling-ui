"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import Swal from "sweetalert2";

export default function SignIn() {
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const router = useRouter();
    const { data: session } = useSession();

    // const searchParams = useSearchParams()
    // const callbackUrl = searchParams.get("callbackUrl")

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleEmailLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const authRes = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
            callbackUrl: "/",
        });
        if (authRes?.ok) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Loged In Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            axiosSecure.post('/jwt', { email: formData.email })
                .then((res) => {
                    localStorage.setItem("access-token", res.data.token)

                    router.push(authRes.url as string);
                    setFormData({ email: '', password: '' })
                })

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password",
                confirmButtonText: "Try again",
                confirmButtonColor: "#0060f0",
            });
        }
    }

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: "/" })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Loged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                axiosSecure.post('/jwt', { email: session?.user?.email })
                    .then((res) => {
                        localStorage.setItem("access-token", res.data.token)
                    })
            })
            .catch((error) => {
                console.error('Signin failed:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed",
                    confirmButtonText: "Try again",
                    confirmButtonColor: "#0060f0",
                });
            });

    }

    return (
        <div className="p-8 rounded-lg mt-10 shadow-2xl shadow-teal-200 max-w-screen-xl w-full md:w-2/3 lg:w-1/2 mx-auto space-y-8">
            <form onSubmit={handleEmailLogin}
                className="space-y-8">
                <div className="space-y-2">
                    <label className="font-semibold">
                        Email
                    </label>
                    <input type="email" name="email" placeholder="email" required
                        onChange={handleFormChange}
                        value={formData.email}
                        className="p-3 border rounded-lg w-full" />
                </div>
                <div className="space-y-2">
                    <label className="font-semibold">
                        Password
                    </label>
                    <div className="relative">
                        <span onClick={() => setShowPass(!showPass)}
                            className="absolute right-2 top-5">{showPass ? <FaEye className="cursor-pointer w-12" /> :
                                <IoMdEyeOff className="cursor-pointer w-12" />}
                        </span>
                        <input type={showPass ? "password" : "text"} name="password" placeholder="password" required
                            onChange={handleFormChange}
                            value={formData.password}
                            className="p-3 border rounded-lg w-full" />
                    </div>
                </div>
                <div>
                    <button disabled={loading}
                        className={`px-6 py-3 rounded w-full ${loading ? "bg-slate-100 text-slate-800" : "bg-gradient-to-br from-teal-500 to-[#0060f0] text-white"}`}>{loading ? "Loading..." : "Login"}</button>
                </div>
            </form>
            <div>
                <p className="flex gap-4">
                    <span className="font-bold">Login with</span> <button onClick={handleGoogleLogin} className="text-4xl"><FcGoogle /></button>
                </p>
            </div>
            <div className="flex justify-between">
                <div>
                    <span className="font-bold">New here?</span>
                    <Link href="/signup" className="text-blue-600 font-bold"> Register Now</Link>
                </div>
                <div>
                    <span className="font-bold">Go to </span><Link href="/" className="px-4 py-2 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold"> Home Page</Link>
                </div>
            </div>
        </div>
    )
}
