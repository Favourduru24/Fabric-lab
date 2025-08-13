import { fetchWithAuth } from "./base-service";
import { getSession } from "next-auth/react"

export const getUserDesign = () => {
    return fetchWithAuth('/v1/design/get-user-design')
}

export const getUserDesignById = (id) => {
    return fetchWithAuth(`/v1/design/get-user-design/${id}`)
}

export const saveDesign = (designData, id=null) => {
    return fetchWithAuth("/v1/design/save-design", {
        method: 'POST',
        data: {  
            ...designData,
            id,
        },
    });
};

export const deleteDesign = (id) => {
    return fetchWithAuth(`/v1/designs${id}`, {
        method: 'DELETE'
    })
}

export async function saveCanvasState(canvas, designId = null, title = "Untitled Design") {
      const session = await getSession()

     if(!session) {
        throw new Error('Not authenticated') 
     }

    if(!canvas) return false

    try {
        const canvasData = canvas.toJSON(["id", 'filters'])

        const designData = {
             name: title,
            canvasData: JSON.stringify(canvasData),
            width: canvas.width,
            height: canvas.height
        }

        return saveDesign(designData, designId)

    } catch(e) {
     console.error('Error saving canvas state', e)    
    }
}

 