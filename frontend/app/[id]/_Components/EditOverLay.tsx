
import OverLay from '@/Components/Common/OverLay'
import React from 'react'
import TransferBalance from './TransferBalance'

const EditOverLay = ({edit, handleOverLay, overlay}:{edit:string, handleOverLay:()=>void, overlay:boolean}) => {
  return (
    <div>
      <OverLay 
        handleToggler={handleOverLay}
        toggleDetails={overlay}
      >
        <TransferBalance edit={edit} />
      </OverLay>
    </div>
  )
}

export default EditOverLay
