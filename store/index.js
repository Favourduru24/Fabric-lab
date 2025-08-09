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
      const designId = get().id
      
      if(designId) {
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
       const designId = get().id
       const canvas = get().canvas

       if(!designId || !canvas) {
          console.log('No design available or canvas available')
       }

       try {
          const saveDesign = await saveCanvasState(canvas, designId, get().name)

          set({
            saveStatus: 'Saved',
            isModified: false
          })

          return saveDesign
       } catch (error) {
         
       }
    },
    debouncedSaveToServer: debounce(() => {
          get().saveToSever()
    }, 500),
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