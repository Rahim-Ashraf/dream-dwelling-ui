"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";


const Signup = () => {
    const axiosSecure = useAxiosSecure()
    const router = useRouter();
    const [showPass, setShowPass] = useState(true);
    const [regisLoading, setRegisLoading] = useState(false)

    const [formData, setFormData] = useState({ email: "", password: "", userName: "" })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const [photoInput, setPhotoInput] = useState<{ photo: File | null }>({ photo: null });
    const handlePhodoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setPhotoInput(prev => ({ ...prev, photo: file || null }));
    }

    const handleEmailRegister = async (e: FormEvent) => {
        e.preventDefault();

        setRegisLoading(true);
        const photo = photoInput.photo;
        let photoURI = "";
        if (photo) {
            try {
                const photoData = new FormData()
                photoData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
                photoData.append("image", photo)
                const res = await axios.post("https://api.imgbb.com/1/upload", photoData)
                photoURI = res.data.data.image.url;
            }
            catch (err) {
                console.error("imgbb", err)
                setRegisLoading(false)
            }

        }
        axios.post("http://localhost:3000/api/users", { ...formData, photoURI })
            .then(async () => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registered Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                const authRes = await signIn("credentials", {
                    redirect: false,
                    email: formData.email,
                    password: formData.password,
                    callbackUrl: "/", // Redirect path after login
                });
                if (authRes?.ok) {
                    axiosSecure.post('/jwt', { email: formData.email })
                        .then((res) => {
                            localStorage.setItem("access-token", res.data.token)
                            router.push(authRes.url || '/');
                            setRegisLoading(false)
                        })
                }

            })
            .catch(err => {
                console.log("signup err", err)
                if (err.status === 409) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email already exist",
                        text: "Please enter a new email"
                    });
                }
                setRegisLoading(false)
            })
    }
    return (
        <div className="mt-10 p-8 rounded-xl shadow-2xl shadow-teal-200 max-w-screen-xl w-full md:w-2/3 lg:w-1/2 mx-auto">

            <form onSubmit={handleEmailRegister}
                className="space-y-8">
                <div>
                    <label className="font-semibold">
                        <span>Name</span>
                        <span className="text-rose-600 text-xl">*</span>
                    </label>
                    <input onChange={handleChange} value={formData.userName}
                        type="text" name="userName" placeholder="Name" required
                        className="p-3 rounded-lg border w-full" />
                </div>
                <div>
                    <label>
                        <span className="font-semibold">Photo</span>
                    </label>
                    <input onChange={handlePhodoInputChange}
                        type="file" name="photo" placeholder="Photo"
                        className="w-full file:p-3 file:border-none file:bg-gray-700 file:text-white fle:font-semibold file:mr-2 border rounded-lg" />
                </div>
                <div>
                    <label className="font-semibold">
                        <span>Email</span>
                        <span className="text-rose-600 text-xl">*</span>
                    </label>
                    <input onChange={handleChange} value={formData.email}
                        type="email" name="email" placeholder="email" required
                        className="p-3 rounded-lg border w-full" />
                </div>
                <div>
                    <label className="font-semibold">
                        <span>Password</span>
                        <span className="text-rose-600 text-xl">*</span>
                    </label>
                    <div className="relative">
                        <span onClick={() => setShowPass(!showPass)}
                            className="absolute right-2 top-5">{showPass ? <FaEye className="cursor-pointer w-12" /> :
                                <IoMdEyeOff className="cursor-pointer w-12" />}
                        </span>

                        <input onChange={handleChange} value={formData.password}
                            type={showPass ? "password" : "text"} name="password" placeholder="password" required
                            className="p-3 rounded-lg border w-full" />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={regisLoading}
                        className={`px-6 py-3 rounded w-full ${regisLoading ? "bg-slate-100 text-slate-800" : "bg-gradient-to-br from-teal-500 to-[#0060f0] text-white"}`}>
                        {regisLoading ? "Loading..." : "Register"}
                    </button>
                </div>
            </form>

            <div className="md:flex justify-between mt-12 space-y-8 md:space-y-0">
                <div>
                    <span className="font-bold">Alredy Have an Account?</span>
                    <Link href="/signin" className="text-blue-600 font-bold"> Login</Link>
                </div>
                <div>
                    <span className="font-bold">Go to </span>
                    <Link href="/" className="px-8 py-4 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold"> Home Page</Link>
                </div>
            </div>

        </div>
    );
};

export default Signup;