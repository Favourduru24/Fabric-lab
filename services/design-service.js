import { fetchWithAuth } from "./base-service";

export const getUserDesign = () => {
    return fetchWithAuth('/v1/designs')
}

export const getUserDesignById = (id) => {
    return fetchWithAuth(`/v1/designs${id}`)
}

export const saveDesign = (designData, id) => {
    return fetchWithAuth("/v1/designs", {
        method: 'POST',
        body: {
            ...designData,
            id
        }
    })
}

export const deleteDesign = (id) => {
    return fetchWithAuth(`/v1/designs${id}`, {
        method: 'DELETE'
    })
}

export async function saveCanvasState(canvas, designId = null, title = "Untitled Design") {
    if(!canvas) return false

    try {
        const canvasData = canvas.toJSON("id", 'filters')

        const designData = {
             name: 'title',
            canvasData: JSON.stringify(canvasData),
            width: canvas.width,
             height: canvas.height
        }

        return saveDesign(designData, designId)

    } catch(e) {
     console.error('Error saving canvas state', e)    
    }
}

 