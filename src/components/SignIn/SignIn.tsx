"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function SignIn() {
    const axiosSecure = useAxiosSecure()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const router = useRouter();
    const { data: session } = useSession();


    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleEmailLogin = async (e: FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
            callbackUrl: "/", // Redirect path after login
        });
        if (res?.ok) {
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
                })
            setFormData({ email: '', password: '' })
            router.push(res.url || '/');
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
        signIn('google', { callbackUrl: '/' })
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
                console.error('Sign-in failed:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login failed",
                    confirmButtonText: "Try again",
                    confirmButtonColor: "#0060f0",
                });
            });
        // googleLogin()
        //     .then((res) => {
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             title: "Loged In Successfully",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //         axios.post("https://dream-dwellings-server.vercel.app/users", { email: res.user.email, userName: res.user.displayName })
        //         router.push(prevRoute ? `${prevRoute}` : "/");
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         Swal.fire({
        //             icon: "error",
        //             title: "Oops...",
        //             text: "Login failed"
        //         });

        //     })

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
                        className="p-2 border rounded-lg w-full" />
                </div>
                <div className="space-y-2">
                    <label className="font-semibold">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="password" required
                        onChange={handleFormChange}
                        value={formData.password}
                        className="p-2 border rounded-lg w-full" />
                </div>
                <div>
                    <button className="px-4 py-2 rounded w-full bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Login</button>
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
