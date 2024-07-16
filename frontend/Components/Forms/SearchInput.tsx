import React, { ChangeEvent, useEffect } from 'react'
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
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    value: string | number | undefined;
    changeWithValue:(value:string)=>void
}
const SearchInput = ({
    label,
    labelId,
    value,
    type,
    onChange,
    changeWithValue
}:Props) => {
    const [searchAccount, {data}] = useSearchAccountByNameMutation()
    useEffect(()=>{
        if(value){
            searchAccount({query:value.toString()})
        }
    },[value])

  return (
    <div>
      <FloatingInput
        label={label}
        labelId={labelId}
        onChange={onChange}
        type={type}
        value={value}
        required
      />
      {
        data?.accounts?.length && value?
        <div className='w-full max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2  rounded-md mt-1'>
        {
            data?.accounts.map((account:accountType)=>(
                <div 
                    className="bg-white w-full p-2 rounded-md cursor-pointer"
                    onClick={()=>changeWithValue(account.name)}
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
