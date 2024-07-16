import DataTable from "@/Components/Tables/DataTable";
import AddNewFile from "./_Components/AddNewFile";


export default function page() {

  
  
  return (
    <>
      <div className="lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-md my-3 overflow-hidden transition-all p-5 space-y-10">
        <AddNewFile />
        <DataTable />
      </div>
    </>
  );
}
