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


 