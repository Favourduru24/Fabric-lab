import {saveAs} from 'file-saver'
import jsPDF from 'jspdf'

export function exportAsJson (canvas, fileName = "JSON FileName") {

    if(!canvas) return
    
    try {
      
        const canvasData = canvas.toJSON(["id", 'filters'])

        const jsonString = JSON.stringify(canvasData, null, 2)

        const canvasJsonBlob = new Blob([jsonString], {type: "application/json"})

        saveAs(canvasJsonBlob, `${fileName}.json`)
        
    } catch (error) {
    return false 
    }
}


export function exportAsPng (canvas, fileName = "PNG FileName", options = {}) {

    if(!canvas) return
    
    try {
     
         const defaultOptions = {
            format: 'png',
            quality: 1,
            multiplier: 1,
            enableRetinaScaling: true,
            ...options
         }

        const dataUrl = canvas.toDataURL(defaultOptions)

        saveAs(dataUrl, `${fileName}.png`)
        
    } catch (error) {
    return false 
    }
}

export function exportAsSVG(canvas, fileName = 'SVG FileName', ) {
   
    if(!canvas) return
    
    try {
        const svgData = canvas.toSVG()
        const blob = new Blob([svgData], {type: 'image/svg+xml'})

    saveAs(blob, `${fileName}.svg`)

    return true

    } catch (error) {
    return false 
    }
}

export function exportAsPdf(canvas, fileName = "PDF Design", options = {}) {

    if(!canvas) return

     try {
       const defaultOptions = {
         format: 'a4',
         orientation: 'landscape',
         unit: 'mm',
         ...options
       }  

       const pdf = new jsPDF(
      defaultOptions.orientation,
      defaultOptions.unit,
      defaultOptions.format
       )

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const scale = Math.min(pdfWidth/canvasWidth, pdfHeight/canvasHeight) * 0.9

      const x = (pdfWidth - canvasWidth * scale) / 2
      const y = (pdfHeight - canvasHeight * scale) / 2
      
      const imgData = canvas.toDataURL('image/png', 1.0)

      pdf.addImage(
        imgData,
        'PNG',
        x, y,
        canvasWidth * scale, canvasHeight * scale
      )

      pdf.save(`${fileName}.pdf`)

      return true

     } catch (error) {
        return false   
     }
}