"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import MyTask from './MyTask';
import Image from 'next/image'
import male from "../public/male.png"
import female from "../public/female.png"
import user from "../public/user.png"
import { signOut } from 'next-auth/react'
import Link from 'next/link';

const getAllTasks = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`api/mylist/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Tasks");
        }

        const data = await res.json();

        console.log(data)

        return data;

    } catch (error) {
        console.log("Error loading Tasks: ", error);
    }
};

const MyList = () => {

    const { data: session } = useSession()

    console.log(session);
    const id = session?.user?.id

    console.log(id);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await getAllTasks(id);
                setTasks(tasksData);
            } catch (error) {
                console.log("Error loading Tasks: ", error);
            }
        };

        fetchData();
    }, [id]);

    console.log(tasks)

    return (
        <>

            <div className='flex flex-col sm:flex-row justify-center pb-3 px-3'>
                {/* <div className='my-4 mx-4 p-4 flex flex-col items-center gap-2 sm:w-2/8 sm:sticky top-0'>
                    <Link href={"/dashboard"} className='mb-5 py-2 text-center text-purple-700 bg-slate-200 rounded-lg font-semibold w-32 text-xl'>Back</Link>
                    {session?.user?.gender === "male" ? (
                        <div className=''>
                            <Image src={male} height={70} width={70} alt='male'/>
                        </div>
                    ) : session?.user?.gender === "female" ? (
                        <div className=''>
                            <Image src={female} height={80} width={80} alt='female' />
                        </div>
                    ) : (
                        <div className=''>
                            <Image src={user} height={80} width={80} alt='user'/>
                        </div>
                    )}

                    {
                        session?.user?.name ? 
                        (<div className='text-white font-semibold text-xl'>{session?.user?.name}</div>) : 
                        (<div className='text-gray-400 font-semibold text-xl'>User</div>)
                    }
                    <button onClick={() => signOut()} className='py-2 bg-purple-700 text-slate-200 rounded-lg font-semibold w-28 text-xl'>Logout</button>
                </div> */}

                <div className='w-full sm:w-7/8'>
                    <br />
                    {/* <div className='flex sm:mx-20 text-white'>
                        <div className="text-5xl font-semibold text-purple-400 flex-grow"> My Tasks </div>
                    </div> */}
                    <div className='my-3 sm:mx-20 text-white'>
                        {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
                            tasks.map((item) => (
                                <MyTask
                                    key={item._id}
                                    id={item._id}
                                    owner={item.owner}
                                    title={item.title}
                                    task={item.task}
                                    createdAt={item.createdAt}
                                />
                            ))
                        ) : (
                            <div className='text-white text-center font-semibold text-2xl flex items-center justify-center'>
                                {tasks == null ? 'There is no task' : (<div role="status">
                                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin  dark:text-gray-600 fill-purple-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>)}
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </>
    )
}

export default MyList