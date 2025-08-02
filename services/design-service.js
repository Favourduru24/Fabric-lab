import { fetWithAuth } from "./base-service";

export const getUserDesign = () => {
    return fetWithAuth('/v1/designs')
}

export const getUserDesignById = (id) => {
    return fetWithAuth(`/v1/designs${id}`)
}

export const saveDesign = (designData, id) => {
    return fetWithAuth("/v1/designs", {
        method: 'POST',
        body: {
            ...designData,
            id
        }
    })
}

export const deleteDesign = (id) => {
    return fetWithAuth(`/v1/designs${id}`, {
        method: 'DELETE'
    })
}


 