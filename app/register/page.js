import Register from "@/components/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Registermain() {

  const session=await getServerSession(authOptions)
  console.log("Session",session);

  if(session){
    redirect('/dashboard')
  }

  return (
    <>
      <Register/>
    </>
  )
}
