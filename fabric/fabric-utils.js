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

