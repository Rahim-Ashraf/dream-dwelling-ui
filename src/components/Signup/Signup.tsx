"use client"

import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";


const Signup = () => {
    const [showPass, setShowPass] = useState(true);
    const [registerError, setRegisterError] = useState("")
    const [regisLoading, setRegisLoading] = useState(false)

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if (password.length < 6) {
            setRegisterError("password should be atlest 6 charecter");
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("password should have atlast 1 capital letter");
            return
        } else if (!/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
            setRegisterError("password should have atlast 1 special charecter");
            return
        }
        setRegisLoading(true);
        const photo = e.target.photo.files[0];
        let photoURL = "";
        if (photo) {
            const formData = new FormData()
            formData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
            formData.append("image", photo)
            const res = await axios.post("https://api.imgbb.com/1/upload", formData)
            photoURL = res.data.data.image.url;

        }
        console.log(photoURL)
        axios.post("http://localhost:3000/api/users", { email, password, userName: name, photoURL })
            .then(res => {
                console.log(res)
                setRegisLoading(false)
            })
            .catch(err => {
                console.log("err", err)
                setRegisLoading(false)
            })
    }
    return (
        <div className="mt-10 p-8 rounded-xl shadow-2xl shadow-teal-200 max-w-screen-xl w-full md:w-2/3 lg:w-1/2 mx-auto">

            <form onSubmit={handleEmailRegister}
                className="space-y-8">
                <div>
                    <label>
                        <span className="font-semibold">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Name" required
                        className="p-3 rounded-lg border w-full" />
                </div>
                <div>
                    <label>
                        <span className="font-semibold">Photo</span>
                    </label>
                    <input type="file" name="photo" placeholder="Photo"
                        className="w-full file:p-3 file:border-none file:bg-gray-700 file:text-white fle:font-semibold file:mr-2 border rounded-lg" />
                </div>
                <div>
                    <label>
                        <span className="font-semibold">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" required
                        className="p-3 rounded-lg border w-full" />
                </div>
                <div>
                    <label>
                        <span className="font-semibold">Password</span>
                    </label>
                    <div className="relative">
                        <span onClick={() => setShowPass(!showPass)}
                            className="absolute right-2 top-5">{showPass ? <FaEye className="cursor-pointer w-12" /> :
                                <IoMdEyeOff className="cursor-pointer w-12" />}
                        </span>

                        <input type={showPass ? "password" : "text"} name="password" placeholder="password" required
                            className="p-3 rounded-lg border w-full" />
                    </div>
                    <p className="text-red-600">
                        {registerError}
                    </p>
                </div>
                <div>
                    <button type="submit" disabled={regisLoading} className="px-8 py-4 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full">Register</button>
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