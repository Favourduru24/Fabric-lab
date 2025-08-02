'use client'
import { centerCanvas } from "@/fabric/fabric-utils";
import { create } from "zustand"

export const useEditorStore = create((set, get) => ({
     canvas: null,
     setCanvas: (canvas) => {
        set((canvas));
        if(canvas) {
            centerCanvas(canvas)
        }
     },

     designId: null,
     setDesignId: (id) => set({designId: id}),
     resetStore: () => {
        set({
         canvas: null,
         designId: null
        })
     }
}))