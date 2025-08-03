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
   },
   square: {
     type: 'square',
     label: 'Square',
     defaultProps: {
       width: 80,
       height: 80,
       fill: '#000000'
     },
     thumbnail: (fabric, canvas)  => {
      const {Rect} = fabric 
      const square = new Rect({
         left: 20,
         top: 20,
          width: 60,
          height: 60,
         fill: '#020101ff'
      })

       canvas.add(square)
   }
   },
   triangle: {
     type: 'triangle',
     label: 'Triangle',
     defaultProps: {
       width: 80,
       height: 80,
       fill: '#000000'
     },
     thumbnail: (fabric, canvas)  => {
      const {Triangle} = fabric 
      const triangle = new Triangle({
          left: 20,
          top: 20,
          width: 60,
          height: 60,
          fill: '#020101ff'
      })

       canvas.add(triangle)
   }
   },
   ellipse: {
     type: 'ellipse',
     label: 'Ellipse',
     defaultProps: {
       rx: 60,
       ry: 80,
       fill: '#000000'
     },
     thumbnail: (fabric, canvas)  => {
      const {Ellipse} = fabric 
      const ellipse = new Ellipse({
          left: 15,
          top: 35,
          rx: 35,
          ry: 18,
          fill: '#020101ff'
      })

       canvas.add(ellipse)
   }
   },
  //   polygon: {
  //   type: 'polygon',
  //   label: 'Pentagon',
  //   defaultProps: {
  //     points: [
  //       { x: 50, y: 0 },
  //       { x: 100, y: 38 },
  //       { x: 82, y: 90 },
  //       { x: 18, y: 90 },
  //       { x: 0, y: 38 }
  //     ],
  //     fill: '#000000'
  //   },
  //   thumbnail: (fabric, canvas) => {
  //     const { Polygon } = fabric;
  //     const polygon = new Polygon([
  //       { x: 30, y: 10 },
  //       { x: 50, y: 50 },
  //       { x: 45, y: 50 },
  //       { x: 15, y: 80 },
  //       { x: 10, y: 30 }
  //     ], {
  //       left: 10,
  //       top: 10,
  //       fill: '#000000'
  //     });
  //     canvas.add(polygon);
  //   }
  // },
  
//   star: {
//     type: 'polygon',
//     label: 'Star',
//     defaultProps: {
//       points: [],
//       fill: '#000000'
//     },
//     thumbnail: (fabric, canvas) => {
//       const { Polygon } = fabric;
//       const starPoint = []
//       const outerRadius = 30
//       const innerRadius = 15
//       const center = {x: 50, y:50}
//       const points = 5
//        for (let i = 0; 1 < points * 2; i++) {
//          const radius = i % 2 === 0 ? outerRadius : innerRadius
//           const angle = (i * Math.PI) / points
//          starPoint.push({
//          x: center.x + radius * Math.cos(angle),
//          y: center.y + radius * Math.sin(angle),
//        })
//       }
//       const star = new Polygon(starPoint, {
//           fill: "#000000"
//       });
//       canvas.add(star);
//   }
// },
  
  line: {
    type: 'line',
    label: 'Line',
    defaultProps: {
      x1: 50,
      y1: 50,
      x2: 200,
      y2: 50,
      stroke: '#000000',
      strokeWidth: 5
    },
    thumbnail: (fabric, canvas) => {
      const { Line } = fabric;
      const line = new Line([15, 50, 85, 50], {
        stroke: '#000000',
        strokeWidth: 5
      });
      canvas.add(line);
    }
  },
  
  heart: {
    type: 'path',
    label: 'Heart',
    defaultProps: {
      path: 'M50 30 Q30 0 10 30 Q-10 60 50 90 Q110 60 90 30 Q70 0 50 30 Z',
      fill: '#000000'
    },
    thumbnail: (fabric, canvas) => {
      const { Path } = fabric;
      const heart = new Path('M25 20 Q15 5 5 20 Q-5 40 25 55 Q55 40 45 20 Q35 5 25 20 Z', {
        left: 10,
        top: 10,
        fill: '#000000',
        scaleX: 1.2,
        scaleY: 1.2
      });
      canvas.add(heart);
    }
  },
  roundedRect: {
    type: 'rect',
    label: 'Rounded Rectangle',
    defaultProps: {
      width: 100,
      height: 60,
      rx: 10,
      ry: 10,
      fill: '#000000'
    },
    thumbnail: (fabric, canvas) => {
      const { Rect } = fabric;
      const roundedRect = new Rect({
        left: 15,
        top: 20,
        width: 60,
        height: 40,
        rx: 8,
        ry: 8,
        fill: '#000000'
      });
      canvas.add(roundedRect);
    }
  }
   
}
 
export const shapeTypes = [
  'rectangle', 
  'circle', 
  'square', 
  'triangle', 
  'ellipse',
  'heart',
  'roundedRect',
  'line'
];