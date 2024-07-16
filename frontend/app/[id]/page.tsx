'use client'

import React from 'react'
import { useGetAccountDetailsQuery } from '@/redux/api/dataApiSlice'
import { useParams } from 'next/navigation'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { BiHome } from 'react-icons/bi'

const page = () => {
    const {id}:{id:string} = useParams()
    const {data} = useGetAccountDetailsQuery({id})
    
  return (
    <div className='lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-md my-3 overflow-hidden transition-all p-12'>
        <div className=''>
        {
            data?.account?
                    <Breadcrumb 
                        items={[
                            {title:'Home', href:'/', icon:<BiHome />},
                            {title:`${data?.account?.name}`, href:`/${data?.account?.id}`}
                        ]}
                    />
            :null
        }
        </div>
        <div className='flex justify-evenly items-center my-20'>
            <div className='text-4xl font-bold'>{data?.account?.name}</div>
            <div className='text-4xl font-bold text-green-600'>{data?.account?.balance} $</div>
        </div>
    </div>
  )
}

export default page
