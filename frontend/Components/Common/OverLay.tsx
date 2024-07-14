import { IoClose } from "react-icons/io5";


const OverLay = ({toggleDetails, handleToggler, children}:{toggleDetails:boolean, handleToggler:()=>void, children:React.ReactNode}) => {

  return (
    <div className={'pageContainer prodDetailsContainer ' + " "  + (toggleDetails ? 'showOverLayDetails':'hideOverLayDetails' )}  style={{padding:"0px 0px 10rem"}}>
      <div className="flex justify-end m-3">
        <button 
            className="p-3 rounded-full hover:bg-gray-200 transition-all"
            onClick={handleToggler}
            >
            <IoClose />
        </button>
      </div>
      {children}
    </div>
  )
}

export default OverLay
