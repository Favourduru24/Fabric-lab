'use client'
import { centerCanvas } from "@/fabric/fabric-utils";
import { saveCanvasState } from "@/services/design-service";
import { debounce } from "lodash";
import { create } from "zustand"

export const useEditorStore = create((set, get) => ({
     canvas: null,
     setCanvas: (canvas) => {
        set({canvas});
        if(canvas) {
            centerCanvas(canvas)
        }
     },

     id: null,
     setId: (id) => set({id}),

     isEditing: null,
     setIsEditing: (flag) => set({isEditing: flag}),

     name: 'Untitled Design',
     setName: (value) => set({name: value }),

     showProperties: false,
     setShowProperties: (flag) => set({showProperties: flag }),

     saveStatus: 'saved',
     setSaveStatus: (status) => set({saveStatus: status}),
     lastModified: Date.now(),
     isModified: false,
     
    markAsModified: () => {
      const id = get().id
      
      if(id) {
         set({
            lastModified: Date.now(),
            saveStatus: 'Saving...',
            isModified: true
         })

         get().debouncedSaveToServer()

      } else {
         console.error('No design Id Available.')
      }
    },

    saveToSever: async () => {
       const id = get().id
       const canvas = get().canvas

       if(!id || !canvas) {
          console.log('No design ID or canvas available')
           return null
       }

       try {
          const saveDesign = await saveCanvasState(canvas, id, get().name)

          set({
            saveStatus: 'Saved',
            isModified: false
          })

          return saveDesign

       } catch (error) {
          set({saveStatus: 'Error'})
          return null
       }
    },

    debouncedSaveToServer: debounce(() => {
          get().saveToSever()
    }, 500),

    userSubscription: null,
    setUserSubscription: (data) => set({userSubscription: data}),

    userDesign: [],
    setUserDesign: (data) => set({userDesign: data}),

    showPremiumModal: false,
    setPremiumModal: (flag) => set({showPremiumModal: flag}),

     resetStore: () => {
        set({
         name: 'Untitled Design',
         canvas: null,
         id: null,
         isEditing: true,
         showProperties: false,
         saveStatus: 'Saved',
         isModified: false,
         lastModified: Date.now()
        })
     }
}))