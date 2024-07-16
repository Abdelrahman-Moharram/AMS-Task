'use client'
import { useGetDataListQuery } from '@/redux/api/dataApiSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import Paginition from './Paginition';
import Link from 'next/link';
import { BsEye } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import EditOverLay from '@/app/[id]/_Components/EditOverLay';
interface accountType{
  id: string;
  name: string;
  balance: number
}
const to_int_or_default = (val:string|null)=>{
  try{
      if(val)
          return parseInt(val)
  }
  catch{
  }
  return null
}


const DataTable = () => {
  const searchParams = useSearchParams()
  const [overlay, setOverlay] = useState(false)

  let size = to_int_or_default(searchParams.get("size"))
  let page = to_int_or_default(searchParams.get("page"))
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
  
      return params.toString()
    },
    [searchParams]
  )

  if(!size){
      router.push(pathname + '?' + createQueryString('size', "20"))
  }
  if(!page){
      page = 1
      router.push(pathname + '?' + createQueryString('page', "1"))
  }
  const {data} = useGetDataListQuery(
    {page:page-1, size:size??20}, 
    {refetchOnMountOrArgChange:true}
  )

  const handleOverLay = () =>{
    console.log(overlay);
    setOverlay(!overlay)
    
  }
  const [edit, setEdit] = useState<string | null>(null)
  const handleEditItem = (id:string) =>{
    setEdit(id)
    handleOverLay()
  }

  return (
<>
{
  data?.accounts?.length?
  
  <>
  {
    edit?
      <EditOverLay
        edit={edit} 
        handleOverLay={handleOverLay}
        overlay={overlay}
      />
    :null
  }
  <div className="rounded-lg border border-gray-200">
    <div className="overflow-x-auto rounded-t-lg">

      
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <>
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">#</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Balance</th>
                <th className="whitespace-nowrap font-medium text-gray-900">operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {
                data?.accounts?.map((row:accountType, idx:number)=>(
                  <tr key={idx}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{size?(page-1) * size + (idx+1) : page + idx}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.balance}</td>
                    <td className="">
                      <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 gap-3">
                        <Link
                            href={`/${row.id}`}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
                          >
                            <BsEye />

                            View
                        </Link>
                          
                        <button
                          onClick={()=>handleEditItem(row?.id)}
                          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
                        >
                          <BiEdit />
                          Edit
                        </button>                        
                      </div>
                    </td>
                  </tr>
                ))
              }
            
            </tbody>
          </>
        </table>
        
    </div>

  </div>
    <div className="flex justify-center">
      <Paginition page={data?.page+1} totalPages={data?.total} />
    </div>
  </>
  :
  <div className='text-center text-lg font-bold'>No data Added yet</div>
}
</>
  )
}

export default DataTable
