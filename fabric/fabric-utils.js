import { resolve } from 'styled-jsx/css'
import { createShape } from './shape-factory'
import {shapeDefinitions } from './shape-utils'

export const initializeFabric = async (canvasEl, containerEl) => {
 try {
    const {Canvas, PencilBrush} = await import('fabric')

    const canvas = new Canvas(canvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true
    })

    const brush = new PencilBrush(canvas)
    brush.color =  '#000000'
    brush.width = 5
    canvas.freeDrawingBrush = brush

    return canvas

  } catch (error) {
    console.error(error, 'Failed to load fabric', error)
     return null
  }
 }


export const centerCanvas = (canvas) => {
  if(!canvas || !canvas.wrapperEl) return

   const canvaswrapper = canvas.wrapperEl

   canvaswrapper.style.width = `${canvas.width}px`
   canvaswrapper.style.height = `${canvas.height}px`
   
   canvaswrapper.style.position = "absolute"
   canvaswrapper.style.top = "50%"
   canvaswrapper.style.left = "50%"
   canvaswrapper.style.transform = "translate(-50%, -50%)"

}

 

export const addShapeToCanvas = async (canvas, shapeTypes, customProps={}) => {

  if(!canvas) return null

  try {
    const fabricModule = await import('fabric') 

    const shape = createShape(fabricModule,shapeTypes, shapeDefinitions, {
       left: 100,
       top: 100,
       ...customProps 
    })

     if(shape) {
       shape.id = `${shapeTypes}-${Date.now()}` 
       canvas.add(shape)
       canvas.setActiveObject(shape)
       canvas.renderAll()
       return shape
     }
  } catch (error) {
    
  }
} 


export const addTextToCanvas = async (canvas, text, options = {}, withBackground = false) => {
  
  if(!canvas) return null

   try {
     const {IText} = await import('fabric')

     const defaultProp = {
       left: 100,
       top: 100,
       fontSize: 24,
       fontFamily: 'Arial',
       fill: '#000000',
       padding: withBackground ? 10 : 0,
       textAlign: 'left',
       id: `text-${Date.now()}`
     }

     const textObt  = new IText(text, {
      ...defaultProp,
      ...options
     })
      
      canvas.add(textObt)
      canvas.setActiveObject(textObt)
       canvas.renderAll()

       return textObt

   } catch (error) {
     return null
   }
   
}

export const toggleDrawingMode = (canvas, isDrawingMode, drawingColor = "#000000", brushWidth = 5) => {
   
    if(!canvas) return null

     try {
      canvas.isDrawingMode = isDrawingMode

       if(isDrawingMode) {
         canvas.freeDrawingBrush.color = drawingColor
         canvas.freeDrawingBrush.width = brushWidth
       }

       return true 
      
     } catch (error) {
       return false
     }
}

export const toggleEraserMode = (canvas, isErasing, previousColor = '#000000', eraserWidth = 20) => {

    if(!canvas ||  !canvas.freeDrawingBrush) return false

    try {
       if(isErasing) {
         canvas.freeDrawingBrush.color = '#ffffff'
         canvas.freeDrawingBrush.width = eraserWidth
       } else {
         canvas.freeDrawingBrush.color = previousColor
         canvas.freeDrawingBrush.width = 5
       }

       return true
    } catch (error) {
       return false
    }

}

 export const updateDrawingBrush = (canvas, properties = {}) => {
   if(!canvas ||  !canvas.freeDrawingBrush) return false

    try {
        const {color, width, opacity} = properties
        
      if(color !== undefined) {
        canvas.freeDrawingBrush.color= color
      } 

      if(width !== undefined) {
        canvas.freeDrawingBrush.width= width
      }

      if(opacity !== undefined) {
        canvas.freeDrawingBrush.opacity= opacity
      }

      return true


    } catch (error) {
       return false
    }
 }


 export const addImageToCanvas = async (canvas, imageUrl) => {
   if(!canvas) return null
   
    try {
      const {Image: FabricImage} = await import('fabric')

      let imgObj = new Image()
       imgObj.crossOrigin = 'Anonymous'
       imgObj.src = imageUrl

       return new Promise((resolve, reject) => {
        imgObj.onload = () => {
           
          let image = new FabricImage(imgObj)
          image.set({
            id: `image-${Date.now()}`,
            top: 100,
            left: 100,
            padding: 10,
            cornorSize: 10
          })

          const maxDimension = 400

          if(image.width > maxDimension || image.width > maxDimension) {
            if(image.width > image.height) {
              const scale = maxDimension / image.width
              image.scale(scale)
            } else {
              const scale = maxDimension / image.height
              image.scale(scale)
            }
          }

          canvas.add(image)
           canvas.setActiveObject(image)
           canvas.renderAll()

           resolve(image)
        }

        imgObj.onerror = () => {
           reject(new Error('Failed to load image', imageUrl))
        }
       })

    } catch (error) {
      return null
      console.error('Error adding image')
    }

  }

  export const cloneSelectedCanvas = async (canvas) => {
   if(!canvas) return

   const activeObject = canvas.getActiveObject()

    if(!activeObject) return

    try {
       const cloneObj = await activeObject.clone()
     
        cloneObj.set({
           left: activeObject.left + 10,
           top: activeObject.top + 10,
           id: `${activeObject.type || 'object'}-${Date.now()}`
        })

      canvas.add(cloneObj)
      canvas.renderAll()

      return cloneObj

    } catch (error) {
      console.error('Error while cloning') 
      return null
    }
  }

  export const deleteSelectedCanvas = (canvas) => {
    if(!canvas) return

   const activeObject = canvas.getActiveObject()

    if(!activeObject) return

    try {

       canvas.remove(activeObject)
       canvas.discardActiveObject()
       canvas.renderAll()
      
       return true

    } catch (error) {
       console.log('Error deleting canvas object.')
       return false
    }
  }

  export const customizeBoundaryBox = (canvas) => {
    if(!canvas) return

    try {
      canvas.on('object:added', (e) => {
        if(e.target){
          e.target.set({
             borderColor: '#00ffe7',
             cornerColor: '#000000',
             cornerStrokeColor: '#00ffe7',
             cornerSize: 10,
             transparentCorners: false
          })
        }
      })  
      
      canvas.getObjects().forEach(obj => {
         obj.set({
            borderColor: '#00ffe7',
             cornerColor: '#000000',
             cornerStrokeColor: '#00ffe7',
             cornerSize: 10,
             transparentCorners: false
         })
      })

       canvas.renderAll()
    } catch (error) {
      console.log('Failed to customize boundary box')
    }
  }