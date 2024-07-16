import { apiSlice } from "../services/apiSlice";


const DataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({


        getDataList:builder.query({
            query:({size, page}:{size:number, page:number})=>({
                url:"/",
                method:'GET',
                params:{size, page}
            }),
        }),

        getAccountDetails:builder.query({
            query:({id}:{id:string})=>({
                url:`${id}/`,
                method:'GET',
            }),
        }),

        addData:builder.mutation({
            query:({form}:{form:FormData})=>({
                url:"add/",
                method:'POST',
                body:form
            }),
        }),
        searchAccountByName:builder.mutation({
            query:({query}:{query:string})=>({
                url:"search/",
                method:'GET',
                params:{query}
            }),
        }),
        
    })
         
}) 

export const {
    useGetDataListQuery,
    useAddDataMutation,
    useGetAccountDetailsQuery,
    useSearchAccountByNameMutation
} = DataApiSlice