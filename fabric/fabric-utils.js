
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
    console.error(error, 'Fabric to load fabric', error)
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
   canvaswrapper.style.transform = "translate(-50%, -50%)"

}

