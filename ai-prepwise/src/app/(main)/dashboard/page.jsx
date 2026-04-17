// // import React from 'react'
// // import WelcomeContainer from './_components/WelcomeContainer';
// // import CreateOption from './_components/CreateOption';
// // import LatestInterviewsList from './_components/LatestInterviewsList';

// // function Dashboard() {
// //   return (
// //     <div>
// //       {/* <WelcomeContainer /> */}
// //       <h2 className=' my-3 font-bold text-2xl '> Dashboard</h2>
// //       <CreateOption />
// //       <LatestInterviewsList />
// //     </div>
// //   )
// // }

// // export default Dashboard;
// import { redirect } from 'next/navigation';
// import { createClient } from '@/lib/supabase/server';

// export default async function Dashboard() {
//   const supabase = createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     redirect('/auth'); // not logged in
//   }

//   return (
//     <div>
//       Dashboard
//     </div>
//   );
// }
"use client"
import { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useRouter } from 'next/navigation'
import CreateOption from './_components/CreateOption'
import LatestInterviewsList from './_components/LatestInterviewsList'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data?.user) {
        
        router.push('/login') // ❌ not logged in
      }
    }

    checkUser()
  }, [])

  return (
    <div >
      {/* <h1 className="text-3xl font-bold">
        Welcome to Dashboard 🚀
      </h1> */}
      
     
    <CreateOption/>
    <LatestInterviewsList/>
    </div>
  )
}