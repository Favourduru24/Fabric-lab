import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice"

const designAdapter = createEntityAdapter({})
 
const initialState = designAdapter.getInitialState()

export const designsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDesign: builder.query({
          query: ({query = '', page = 1, limit = 5}) => ({
            url: `/v1/design/get-all-design`,
            params: {
            query,
            page,
            limit,
            }
          }),
          forceRefetch: ({ currentArg, previousArg }) => {
            // Trigger refetch when page changes
            return currentArg?.page !== previousArg?.page;
          },
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
          
          transformResponse: responseData => {
            // Transform the data before normalization
            const loadedDesigns = responseData.data.map(design => ({  
              ...design,
              id: design._id 
            }));
            
            return designAdapter.setAll(initialState, loadedDesigns);
          },
          
          providesTags: (result, error, arg) => {
            if(result?.ids){
              return [
                { type: 'Design', id: 'LIST' },
                ...result.ids.map(id => ({ type: 'Design', id }))
              ]
            } else {
              return [{ type: 'Design', id: 'LIST' }]
            }
          }
        }),
        getUserDesign: builder.query({
          query: (userId) => `/feeds/feed/user/${userId}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
             transformResponse: responseData => {
                const loadedDesigns = responseData.data.map(design => {
                    design.id = design._id
                      return design 
                })
                return designAdapter.setAll(initialState, loadedDesigns)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
          deleteFeed: builder.mutation({
            query: (id) => ({
                url: `/feeds/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Feed', id:arg.id}]
          }),
        }),
        overrideExisting: true
})

          export const {  
          useGetDesignQuery,
          useGetUserDesignQuery,
          useDeleteFeedMutation,
      } = designsApiSlice

// returns the query result object
export const selectFeedsResult = designsApiSlice.endpoints.getDesign.select()

// creates memoized selector
const selectDesignsData = createSelector(
selectDesignsResult,
designsResult => designsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllDesigns,
selectById: selectDesignById,
selectIds: selectDesignIds
// Pass in a selector that returns the feeds slice of state
} = designAdapter.getSelectors(state => selectDesignsData(state) ?? initialState)

