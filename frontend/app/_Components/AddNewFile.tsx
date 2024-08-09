'use client'
import { ImageInput } from '@/Components/Forms'
import AddModal from '@/Components/Modals/AddModal'
import { useAddDataMutation } from '@/redux/api/dataApiSlice'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

const AddNewFile = () => {
    const  [addData, {isLoading}] = useAddDataMutation()
    const [file, setFile] = useState<File | null>()
    const [showModal, setShowModal] = useState(false)
    
    const handleAddModal = ()=>{
        setShowModal(!showModal)
    }
    const handleFile = (e:ChangeEvent<HTMLInputElement>) =>{
      const allowed = ['csv', 'xlxs']
      const files = e.target.files
      
      if (files?.length ){
        const filename = files[0].name.split('.');
        if( filename?.length && allowed.includes(filename[filename.length - 1]) )
          setFile(files[0])
        else{
          toast.error(`"${files[0].name}" is invalid file type only allowed [${allowed.join(', ')}]`)
        }
      }
      
    }
    const addAction = ()=>{
      if(file){
        const form = new FormData()
        form.append('file', file)
        addData({form})
        .unwrap()
        .then(res=>{
            console.log(res);
            handleAddModal()
            toast.success(res.message)
        })
        .catch(err=>{
            console.log(err);
            toast.error(err?.data?.detail)
        })
      }
    }
  return (
    <div>
        <button 
            className="bg-purple-600 px-5 py-2 hover:bg-purple-700 rounded-md text-white"
            onClick={handleAddModal}
        >
            + Add file
        </button>

        <AddModal
            addAction={addAction}
            isLoading={isLoading}
            handleClose={handleAddModal}
            open={showModal}
        >
            <div className="min-w-[500px] flex justify-center my-5">
                <ImageInput 
                    label='Data File'
                    labelId='file'
                    type='file'
                    required
                    onChange={handleFile}
                    file={file}
                />
                <hr />
            </div>
        </AddModal>  
    </div>
  )
}

export default AddNewFile
