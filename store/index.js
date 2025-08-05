'use client'
import { centerCanvas } from "@/fabric/fabric-utils";
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

     resetStore: () => {
        set({
        name: 'Untitled Design',
         canvas: null,
         id: null,
         isEditing: true
        })
     }
}))