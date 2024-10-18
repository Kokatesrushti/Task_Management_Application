"use client"

import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import quotes from '../public/tasks.png'
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const showalert = (t,i) => {
        Swal.fire({
            title: t,
            icon: i,
            confirmButtonText: 'OK'
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!name || !gender || !email || !password ) {
            showalert("Enter valid details","warning")
        }

        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, gender, email, password
                })
            })

            if (res.status == 400) {
                showalert("User already Exists","info")
            }

            if (res.ok) {
                const form = e.target;
                form.reset();
                showalert("Registration Successful","success")
                router.push("/")
            }
            else {
                showalert("User rgistration failed","error")
            }

        } catch (error) {
            console.log("Error during user rgistration", error)
        }
    }

    return (
        <div className="text-white flex items-center justify-center h-screen">
            <div className="py-10 text-white bg-slate-800 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] shadow-lg rounded-lg text-center">
                <div className="flex items-center justify-center mb-4">
                    <Image src={quotes} height={80} width={80} alt="quotes"/>
                </div>
                <div className="text-3xl font-semibold">Register</div>

                <form className="py-4" onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="outline-none bg-slate-800 my-4 border-b border-slate-100 sm:w-[50%]"
                    /><br />

                    <div className="flex justify-center gap-7 font-extralight text-md text-center py-4">
                        <div>Gender</div>
                        <label className="flex items-center space-x-2">
                            <input type="radio" value="male" className=" w-4 h-4 form-radio accent-purple-700" name="color" onChange={(e) => setGender(e.target.value)} />
                            <span className="text-primary">Male</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input type="radio" value="female" className="w-4 h-4 form-radio accent-purple-700" name="color" onChange={(e) => setGender(e.target.value)} />
                            <span className="text-secondary">Female</span>
                        </label>
                    </div>

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
                        Register
                    </button>
                    {
                        error &&
                        (
                            <div className="">
                                {error}
                            </div>
                        )
                    }

                    <Link className="" href={"/"}>
                        <div className="my-3">Already have an account? <span className="text-purple-500">Login</span></div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register