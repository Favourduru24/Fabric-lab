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
   },

   circle: {
     type: 'circle',
     label: 'Circle',
     defaultProps: {
        radius: 50,
        fill: '#000000'
     },
     thumbnail: (fabric, canvas)  => {
      const {Circle} = fabric 
      const circle = new Circle({
         left: 20,
         top: 20,
         radius: 30,
         fill: '#000000'
      })

       canvas.add(circle)
   }
   }
   
}
 
export const shapeTypes = ['rectangle', 'circle'] 