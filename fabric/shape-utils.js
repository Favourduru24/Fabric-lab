export const shapeDefinitions = {
   rectangle: {
     type: 'rect',
     label: 'Rectangle',
     defaultProps: {
        width: 100,
        height: 60,
        fill: '#000000'
     },
      
     thumbnail: (fabric, canvas)  => {
      const {Rect} = fabric 
      const rect = new Rect({
         left: 15,
         top: 35,
         width: 70,
         height: 35,
         fill: '#000000'
      })

       canvas.add(rect)
   }
   }
   
}
 
export const shapeTypes = ['rectangle'] 