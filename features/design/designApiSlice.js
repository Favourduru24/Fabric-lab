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
  query: ({ query = '', page = 1, limit = 5 }) => ({
    url: `/v1/design/get-all-design`,
    params: { query, page, limit }
  }),
  
  forceRefetch: ({ currentArg, previousArg }) => {
    return currentArg?.page !== previousArg?.page || currentArg?.query !== previousArg?.query;
  },
  
  // Simplify status validation
  validateStatus: (response) => response.status === 200,
  
  transformResponse: (responseData) => {
    // Add safety checks for the nested structure
    // if (!responseData?.success || !responseData?.data?.data) {
    //   console.warn('Unexpected API response structure:', responseData);
    //   return designAdapter.setAll(initialState, []);
    // }
    
    const designsArray = responseData.data.data || [];
    
    const loadedDesigns = designsArray?.map(design => ({
      id: design._id, // Ensure id is set first
      ...design,
      // Parse canvasData if it exists and is a string
      canvasData: design.canvasData ? 
        (typeof design.canvasData === 'string' ? 
          JSON.parse(design.canvasData) : design.canvasData) 
        : null,
      // Add timestamp conversions if needed
      createdAt: new Date(design.createdAt).getTime(),
      updatedAt: new Date(design.updatedAt).getTime()
    })).filter(design => design.id); // Filter out invalid entries
    
    // Return pagination metadata along with normalized data
    return {
      designs: designAdapter.setAll(initialState, loadedDesigns),
      pagination: {
        totalPages: responseData.data.totalPages,
        currentPage: responseData.data.currentPage,
        totalItems: responseData.data.totalItems,
        itemsPerPage: responseData.data.itemsPerPage
      }
    };
  },
  
  providesTags: (result) => {
    if (result?.designs?.ids) {
      return [
        { type: 'Design', id: 'LIST' },
        ...result.designs.ids.map(id => ({ type: 'Design', id }))
      ];
    }
    return [{ type: 'Design', id: 'LIST' }];
  }
}),
        getUserDesign: builder.query({
         query: ({query = '', page = 1, limit = 5}) => ({
             url: `/v1/design/get-user-design`,
               params: {
                 query,
                 page,
                 limit,
               }
             }),
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
             transformResponse: responseData => {
                 console.log(responseData)
                const loadedDesigns = responseData.data.map(design => {
                    design.id = design._id
                      return design 
                })
                return designAdapter.setAll(initialState, loadedDesigns)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Design', id:'List'},
             ...result.ids.map(id => ({type: 'Design', id}))
            ]
                }else {
                    return [{type: 'Design', id: 'List'}]
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
export const selectDesignsResult = designsApiSlice.endpoints.getDesign.select()

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

