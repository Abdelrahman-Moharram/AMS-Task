import React, { ChangeEvent, useEffect, useState } from 'react'
import FloatingInput from './FloatingInput'
import { useSearchAccountByNameMutation } from '@/redux/api/dataApiSlice'


interface accountType{
    id: string;
    name: string;
    balance: number
}
interface Props{
    label       :string
    labelId     :string
    type        :string
    changeWithValue:(value:string)=>void;
    exclude?: string[]
}
const SearchInput = ({
    label,
    labelId,
    exclude,
    type,
    changeWithValue
}:Props) => {
    const [nameValue, setNameValue] = useState('')
    const [menu, setMenu] = useState(false)
    const [searchAccount, {data}] = useSearchAccountByNameMutation()
    useEffect(()=>{

        if(nameValue){
            searchAccount({query:nameValue, exclude:exclude})
          }
        console.log(data);
    },[nameValue])
    const handleNameValue = (e:ChangeEvent<HTMLInputElement>) =>{
      setNameValue(e.target.value)
      setMenu(true)
    }
    
    const handleValues = ({name, id}:{name:string, id: string}) =>{
      setNameValue(name)
      changeWithValue(id)
      setMenu(false)      
    }


  return (
    <div>
      <FloatingInput
        label={label}
        labelId={labelId}
        onChange={handleNameValue}
        type={type}
        value={nameValue}
        required
      />
      {
        data?.accounts?.length && nameValue && menu  ?
        <div className='w-full max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2  rounded-md mt-1'>
        {
            data?.accounts.map((account:accountType)=>(
                <div 
                    className="bg-white w-full p-2 rounded-md cursor-pointer"
                    onClick={()=>handleValues({name: account.name, id: account.id})}
                >
                    {account.name}
                </div>
            ))
        }
        </div>
      :null
      }
    </div>
  )
}

export default SearchInput
