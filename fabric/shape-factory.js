export const createShape = (fabric, type, shapeDefinitions, customProps = {}) => {
   const definition = shapeDefinitions[type]

   if(!definition) return null

   const props = {...definition.defaultProps, ...customProps}

   switch (definition.type) {
    case "rect":
        return new fabric.Rect(props)

     case "circle":
        return new fabric.Circle(props)
     case "square":
        return new fabric.Rect(props)
     case "triangle":
        return new fabric.Triangle(props)
     case "ellipse":
        return new fabric.Ellipse(props)
     case "line":
        return new fabric.Line(props)
     case "path":
        return new fabric.Path(props)
     case "roundedRect":
        return new fabric.Rect(props)

       default: 
       return null
   }
    
 }