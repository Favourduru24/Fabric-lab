import { shapeDefinitions } from './shape-utils'

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

 const createShape = (fabric, type, shapeDefinitions, customProps = {}) => {
   const definition = shapeDefinitions(type)

   if(!definition) return null

   const props = {...definition.defaultProps, ...customProps}

   switch (definition.type) {
    case "rect":
        return new fabric.Rect(props)

     case "cicle":
        return new fabric.Circle(props)

    default:
       return null
   }
    
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
       canvas.renderAll()
       canvas.setActiveObject(shape)
       return shape
     }
  } catch (error) {
    
  }
} 



