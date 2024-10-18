"use client"

import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import quotes from '../public/tasks.png'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    console.log(email, password);

    const showAlert = (t, i) => {
        Swal.fire({
            title: t,
            icon: i,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });


            if (res.error) {
                showAlert("Enter valid credentials", "warning")
                return;
            }

            if(res.ok){
                showAlert("Login Successfully", "success");
                router.push("/dashboard")
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="text-white flex items-center justify-center h-screen">
            <div className="py-10 text-white bg-slate-800 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] shadow-lg rounded-lg text-center">
                <div className="flex items-center justify-center mb-4">
                    <Image src={quotes} height={80} width={80} alt="quotes" />
                </div>
                <div className="text-3xl font-semibold">Login</div>

                <form className="py-4" onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="outline-none bg-slate-800 my-4 border-b border-slate-100 sm:w-[50%]"
                    /><br />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="outline-none bg-slate-800 my-4 border-b border-slate-100 sm:w-[50%]"
                    /><br />
                    <button className="py-2 my-8 bg-purple-700 text-slate-200 w-[40%] rounded-lg font-semibold text-xl">
                        Login
                    </button>

                    <Link className="" href={"/register"}>
                        <div className="my-3">Don&apos;t have an account? <span className="text-purple-500">Register</span></div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginForm