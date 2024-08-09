import React from 'react'
import BaseModal from './BaseModal'
import { Spinner } from '../Common';

interface Props{
    open: boolean
    handleClose:()=>void;
    children: React.ReactNode;
    addAction: ()=>void;
    isLoading:boolean
}

const AddModal = ({open, handleClose, children, addAction, isLoading}:Props) => {
  return (
    <div>
        <BaseModal 
            open={open} 
            handleClose={handleClose}
        >
            {children}

            <div className="flex justify-end">
                <button
                    className='bg-purple-600 px-5 py-2 hover:bg-purple-700 rounded-md text-white'
                    title='Add Accounts'
                    onClick={addAction}
                >
                    {
                        isLoading?
                            <span className='flex items-center gap-2'>
                                Save <Spinner sm />
                            </span>
                        :'Save'
                    }
                </button> 
            </div>
        </BaseModal>
    </div>
  )
}

export default AddModal
