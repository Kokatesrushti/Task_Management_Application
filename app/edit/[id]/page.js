"use client"

import Edit from "@/components/Edit"

const edit=({params})=> {

    const {id}=params;

    return (
        <>
            <Edit id={id}/>
        </>
    )
}

export default edit