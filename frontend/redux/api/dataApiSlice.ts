import { apiSlice } from "../services/apiSlice";


const DataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({


        getDataList:builder.query({
            query:({size, page}:{size:number, page:number})=>({
                url:"/",
                method:'GET',
                params:{size, page}
            }),
            providesTags:['accounts_list']
        }),

        getAccountDetails:builder.query({
            query:({id}:{id:string})=>({
                url:`${id}/`,
                method:'GET',
            }),
            providesTags:['accounts_list']
        }),

        addData:builder.mutation({
            query:({form}:{form:FormData})=>({
                url:"add/",
                method:'POST',
                body:form
            }),
            invalidatesTags:['accounts_list']
        }),
        searchAccountByName:builder.mutation({
            query:({query, exclude}:{query:string, exclude:string[] | undefined})=>({
                url:"search/",
                method:'POST',
                body:{exclude, query}
            }),
        }),
        
        transfer:builder.mutation({
            query:({from, to, amount}:{from: string, to: string, amount:number})=>({
                url:"transfer/",
                method:'POST',
                body:{from, to, amount}
            }),
            invalidatesTags:['accounts_list']
        }),
    })
         
}) 

export const {
    useGetDataListQuery,
    useAddDataMutation,
    useGetAccountDetailsQuery,
    useSearchAccountByNameMutation,
    useTransferMutation
} = DataApiSlice