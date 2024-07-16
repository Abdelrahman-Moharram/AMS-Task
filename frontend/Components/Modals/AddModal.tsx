import React from 'react'
import BaseModal from './BaseModal'

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
                    title='Create'
                    onClick={addAction}
                >
                    Save
                </button> 
            </div>
        </BaseModal>
    </div>
  )
}

export default AddModal
