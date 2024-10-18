"use client"

import React, { useState } from 'react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Remove from './Remove'
import Update from './Update'


const MyTask = (props) => {


    const { data: session } = useSession()

    console.log("MyTask",session)


    return (
        <>
            <div className='p-5 my-5 text-white border-4 border-[#435271] hover:border-purple-800 rounded-2xl hover:cursor-pointer'>
                <div className='flex gap-2'>
                    <div className='text-2xl font-semibold flex-grow'>{props.title}</div>
                    <Update id={props.id} />
                    <Remove id={props.id} />
                </div>


                <div className='py-2 text-lg'>{props.task}</div>
                <div className='text-end mt-3'>
                    <span className=' bg-purple-700 px-4 py-2 rounded-lg text-lg font-semibold'>- {session?.user?.name}</span>
                    <div className='pt-3 me-3 font-light'>{moment(props.createdAt).fromNow()}</div>
                </div>
            </div>
        </>
    )
}

export default MyTask