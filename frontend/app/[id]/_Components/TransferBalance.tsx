'use client'
import { FloatingInput } from '@/Components/Forms'
import SearchInput from '@/Components/Forms/SearchInput'
import { useGetAccountDetailsQuery } from '@/redux/api/dataApiSlice'
import React, { ChangeEvent, useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

interface Props{
    edit: string
}
const TransferBalance = ({edit}:Props) => {
    const {data: details} = useGetAccountDetailsQuery({id:edit})
    const [amount, setAmount] = useState<number>()
    const [account, setAccount] = useState<string>()
    const [amountErrors, setAmountErrors] = useState<string[]>([])
    const changeAccount = (e:ChangeEvent<HTMLInputElement>) =>{
        setAccount(e.target.value)
    }
    const changeWithValue = (value:string) =>{
        setAccount(value)
    }
    
    const changeAmount = (e:ChangeEvent<HTMLInputElement>)=>{
        let val = parseFloat(e.target.value)
        setAmount(val)
    }
    const submitValue = ()=>{
        try{
            if (amount && amount <= details?.account?.balance)
                setAmount(amount)
            else{
                setAmountErrors(['invalid amount value please enter a valid number'])
                setAmount(0)
                return
            }
        }
        catch{
            setAmountErrors(['invalid amount value please enter a valid number'])
            return
        }

    }
    return (
        <div className=''>
            <h3 className='text-2xl font-bold  text-center'>Transfer Money</h3>
            <div className='flex justify-center w-full mt-12'>
                {/* left side */}
                <div>
                    <span className='flex  items-center gap-2'>
                        From <IoMdArrowDropright /> <h4 className='text-lg font-semibold'> {details?.account?.name}</h4>
                    </span> 
                    <p className="text-green-600 text-center my-5">{details?.account?.balance} $</p>

                    <FloatingInput 
                        label='amount'
                        required
                        labelId='balance'
                        onChange={changeAmount}
                        type='number'
                        value={amount}
                        errors={amountErrors}
                    />
                </div>
                <div className="w-[1px] bg-black h-[250px] mx-28"></div>
                <div className='space-y-5'>
                    <span className='flex  items-center gap-2'>
                        To 
                    </span> 
                    <SearchInput 
                        label='account'
                        labelId='account'
                        value={account}
                        onChange={changeAccount}
                        type='text'
                        changeWithValue={changeWithValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default TransferBalance
