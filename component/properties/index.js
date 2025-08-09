'use client'

import { cloneSelectedCanvas, deleteSelectedCanvas } from "@/fabric/fabric-utils"
import { useEditorStore } from "@/store"
import { Bold, Copy, Italic, MoveDown, MoveUp, RotateCw, Underline, FlipHorizontal, FlipVertical, Trash2 } from "lucide-react"
import { useEffect, useMemo, useState, useCallback } from "react"
import CustomDropdown from "../CustomDropDown"
import { borderStyles, fontFamilies, imageFilter } from "@/constant"

const Property = () => {
  const { canvas } = useEditorStore()
  
  const [selectedObj, setSelectedObj] = useState(null)
  const [objectType, setObjectType] = useState('')
  
  // Common properties
  const [opacity, setOpacity] = useState(100)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [rotation, setRotation] = useState(0)
  
  // Text properties
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [weight, setWeight] = useState('normal')
  const [fontStyle, setFontStyle] = useState('normal')
  const [underline, setUnderline] = useState(false)
  const [textColor, setTextColor] = useState('#000000')
  const [textBackgroundColor, setTextBackgroundColor] = useState('transparent')
  const [letterSpacing, setLetterSpacing] = useState(0)
  
  // Shape/image properties
  const [fillColor, setFillColor] = useState('#ffffff')
  const [borderColor, setBorderColor] = useState('#000000')
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderStyle, setBorderStyle] = useState('solid')
  
  // Image properties
  const [filter, setFilter] = useState('none')
  const [blur, setBlur] = useState(0)
  
  // Path properties
  const [pathStrokeColor, setPathStrokeColor] = useState('#000000')
  const [pathStrokeWidth, setPathStrokeWidth] = useState(1)
  const [pathFillColor, setPathFillColor] = useState('transparent')

  // Memoized event handlers to prevent unnecessary re-renders
  const updateObjectProperty = useCallback((property, value) => {
    if (!canvas || !selectedObj) return
    
    selectedObj.set(property, value)
    canvas.requestRenderAll()
  }, [canvas, selectedObj])

  const handleSelectionCreated = useCallback(() => {
    if (!canvas) return
    
    const activeObject = canvas.getActiveObject()
    
    if (!activeObject) {
      setSelectedObj(null)
      setObjectType('')
      return
    }
    
    setSelectedObj(activeObject)
    setOpacity(Math.round((activeObject.opacity || 1) * 100))
    setWidth(Math.round(activeObject.getScaledWidth()))
    setHeight(Math.round(activeObject.getScaledHeight()))
    setRotation(activeObject.angle || 0)
    
    // Common properties
    setBorderColor(activeObject.stroke || '#000000')
    setBorderWidth(activeObject.strokeWidth || 0)
    
    // Handle border style
    if (activeObject.strokeDashArray) {
      if (activeObject.strokeDashArray[0] === 5 && activeObject.strokeDashArray[1] === 5) {
        setBorderStyle('dashed')
      } else if (activeObject.strokeDashArray[0] === 2 && activeObject.strokeDashArray[1] === 2) {
        setBorderStyle('dotted')
      } else {
        setBorderStyle('solid')
      }
    }
    
    // Type-specific properties
    switch (activeObject.type) {
      case 'i-text':
        setObjectType('text')
        const textObj = activeObject
        setText(textObj.text || '')
        setFontSize(textObj.fontSize || 24)
        setFontFamily(textObj.fontFamily || 'Arial')
        setWeight(textObj.fontWeight || 'normal')
        setFontStyle(textObj.fontStyle || 'normal')
        setUnderline(textObj.underline || false)
        setTextColor(textObj.fill || '#000000')
        setTextBackgroundColor(textObj.backgroundColor|| 'transparent')
        setLetterSpacing(textObj.charSpacing || 0)
        break
        
      case 'image':
        setObjectType('image')
        const imgObj = activeObject
        if (imgObj.filters?.length) {
          const filterObj = imgObj.filters[0]
          if (filterObj.type === 'Grayscale') setFilter('grayscale')
          else if (filterObj.type === 'Invert') setFilter('invert')
          else if (filterObj.type === 'Sepia') setFilter('sepia')
          else if (filterObj.type === 'Blur') {
            setFilter('blur')
            setBlur((filterObj).blur * 100 || 0)
          } else {
            setFilter('none')
          }
        } else {
          setFilter('none')
        }
        break
        
      case 'path':
        setObjectType('path')
        const pathObj = activeObject
        setPathStrokeColor(pathObj.stroke || '#000000')
        setPathStrokeWidth(pathObj.strokeWidth || 1)
        setPathFillColor(pathObj.fill || 'transparent')
        break
        
      default:
        setObjectType('shape')
        if (activeObject.fill && typeof activeObject.fill === 'string') {
          setFillColor(activeObject.fill)
        }
        break
    }
  }, [canvas])

  const handleSelectionCleared = useCallback(() => {
    setSelectedObj(null)
    setObjectType('')
  }, [])

  // Set up canvas event listeners
  useEffect(() => {
    if (!canvas) return
    
    // Initialize if there's already an active object
    if (canvas.getActiveObject()) {
      handleSelectionCreated()
    }
    
    // Set up event listeners
    canvas.on('selection:created', handleSelectionCreated)
    canvas.on('selection:updated', handleSelectionCreated)
    canvas.on('selection:cleared', handleSelectionCleared)
    canvas.on('object:modified', handleSelectionCreated)
    
    return () => {
      canvas.off('selection:created', handleSelectionCreated)
      canvas.off('selection:updated', handleSelectionCreated)
      canvas.off('selection:cleared', handleSelectionCleared)
      canvas.off('object:modified', handleSelectionCreated)
    }
  }, [canvas, handleSelectionCreated, handleSelectionCleared])

  // Common handlers
  const handleOpacityChange = (e) => {
    const value = parseInt(e.target.value)
    setOpacity(value)
    updateObjectProperty('opacity', value / 100)
  }

  const handleRotationChange = (e) => {
    const value = parseInt(e.target.value)
    setRotation(value)
    updateObjectProperty('angle', value)
  }

  const handleDuplicate = async () => {
    if (!canvas || !selectedObj) return
    await cloneSelectedCanvas(canvas)
  }

  const handleDelete = () => {
    if (!canvas || !selectedObj) return
    deleteSelectedCanvas(canvas)
  }

  const handleBringToFront = () => {
    if (!canvas || !selectedObj) return
    canvas.bringToFront(selectedObj)
    canvas.requestRenderAll()
  }

  const handleSendToBack = () => {
    if (!canvas || !selectedObj) return
    canvas.sendToBack(selectedObj)
    canvas.requestRenderAll()
  }

  const handleFlipHorizontal = () => {
    if (!selectedObj) return
    const flipX = !selectedObj.flipX
    updateObjectProperty('flipX', flipX)
  }

  const handleFlipVertical = () => {
    if (!selectedObj) return
    const flipY = !selectedObj.flipY
    updateObjectProperty('flipY', flipY)
  }

  // Text handlers
  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    updateObjectProperty('text', newText)
  }

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value)
    setFontSize(newSize)
    updateObjectProperty('fontSize', newSize)
  }

  const handleFontFamilyChange = (value) => {
    setFontFamily(value)
    updateObjectProperty('fontFamily', value)
  }

  const handleToggleBold = () => {
    const newWeight = weight === 'bold' ? 'normal' : 'bold'
    setWeight(newWeight)
    updateObjectProperty('fontWeight', newWeight)
  }

  const handleToggleItalic = () => {
    const newStyle = fontStyle === 'italic' ? 'normal' : 'italic'
    setFontStyle(newStyle)
    updateObjectProperty('fontStyle', newStyle)
  }

  const handleToggleUnderline = () => {
    const newUnderline = !underline
    setUnderline(newUnderline)
    updateObjectProperty('underline', newUnderline)
  }

  const handleTextColorChange = (e) => {
    const newColor = e.target.value
    setTextColor(newColor)
    updateObjectProperty('fill', newColor)
  }

  const handleTextBackgroundColorChange = (e) => {
    const newColor = e.target.value
    setTextBackgroundColor(newColor)
    updateObjectProperty('backgroundColor', newColor)
  }

  const handleLetterSpacingChange = (e) => {
    const newSpacing = parseInt(e.target.value)
    setLetterSpacing(newSpacing)
    updateObjectProperty('charSpacing', newSpacing)
  }

  // Shape handlers
  const handleFillColorChange = (e) => {
    const newColor = e.target.value
    setFillColor(newColor)
    updateObjectProperty('fill', newColor)
  }

  const handleBorderColorChange = (e) => {
    const newColor = e.target.value
    setBorderColor(newColor)
    updateObjectProperty('stroke', newColor)
  }

  const handleBorderWidthChange = (e) => {
    const newWidth = parseInt(e.target.value)
    setBorderWidth(newWidth)
    updateObjectProperty('strokeWidth', newWidth)
  }

  const handleBorderStyleChange = (value) => {
    setBorderStyle(value)
    let strokeArray = null
    
    if (value === 'dashed') {
      strokeArray = [5, 5]
    } else if (value === 'dotted') {
      strokeArray = [2, 2]
    }
    
    updateObjectProperty('strokeDashArray', strokeArray)
  }

  // Image handlers
  const handleImageFilterChange = async (value) => {
    setFilter(value)
    
    if (!canvas || !selectedObj || selectedObj.type !== 'image') return
    
    try {
      const { filters } = await import('fabric')
      const imgObj = selectedObj
      
      imgObj.filters = []
      
      switch (value) {
        case 'grayscale':
          imgObj.filters.push(new filters.Grayscale())
          break
        case 'sepia':
          imgObj.filters.push(new filters.Sepia())
          break
        case 'invert':
          imgObj.filters.push(new filters.Invert())
          break
        case 'blur':
          imgObj.filters.push(new filters.Blur({ blur: blur / 100 }))
          break
        case 'none':
        default:
          break
      }
      
      imgObj.applyFilters()
      canvas.requestRenderAll()
    } catch (e) {
      console.error('Failed to apply filters', e)
    }
  }

  const handleBlurChange = (e) => {
    const newBlur = parseInt(e.target.value)
    setBlur(newBlur)
    
    if (filter === 'blur' && selectedObj?.type === 'image') {
      handleImageFilterChange('blur') // Reapply blur with new value
    }
  }

  // Path handlers
  const handlePathStrokeColorChange = (e) => {
    const newColor = e.target.value
    setPathStrokeColor(newColor)
    updateObjectProperty('stroke', newColor)
  }

  const handlePathStrokeWidthChange = (e) => {
    const newWidth = parseInt(e.target.value)
    setPathStrokeWidth(newWidth)
    updateObjectProperty('strokeWidth', newWidth)
  }

  const handlePathFillColorChange = (e) => {
    const newColor = e.target.value
    setPathFillColor(newColor)
    updateObjectProperty('fill', newColor)
  }

  // Memoize sections to optimize rendering
  const sizePositionSection = useMemo(() => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-500">Size & Position</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-semibold">Width</p>
          <div className="h-9 px-3 py-2 border rounded-md flex items-center text-gray-400 border-gray-200 shadow-sm w-28">
            {width}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-semibold">Height</p>
          <div className="h-9 px-3 py-2 border rounded-md flex items-center text-gray-400 border-gray-200 shadow-sm w-28">
            {height}
          </div>
        </div>
        <div className="space-y-1 col-span-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-semibold">Rotation</p>
            <span className="text-sm text-gray-500 font-semibold">{rotation}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-semibold">Opacity</p>
            <span className="text-sm text-gray-500 font-semibold">{opacity}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          className="flex items-center gap-2 h-9 px-3 py-2 w-28 border rounded-sm shadow-sm cursor-pointer"
          onClick={handleFlipHorizontal}
        >
          <FlipHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Flip H</span>
        </button>
        <button
          className="flex items-center gap-2 h-9 px-3 py-2 w-28 border rounded-sm shadow-sm cursor-pointer"
          onClick={handleFlipVertical}
        >
          <FlipVertical className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Flip V</span>
        </button>
      </div>
    </div>
  ), [width, height, rotation, opacity, handleRotationChange, handleOpacityChange, handleFlipHorizontal, handleFlipVertical])

  const layerPositionSection = useMemo(() => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-500">Layer Position</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="flex items-center gap-2 h-9 px-2 py-2 w-fit border rounded-sm shadow-sm cursor-pointer"
          onClick={handleBringToFront}
        >
          <MoveUp className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Bring to front</span>
        </button>
        <button
          className="flex items-center gap-1 h-9 px-2 py-2 w-fit border rounded-sm shadow-sm cursor-pointer"
          onClick={handleSendToBack}
        >
          <MoveDown className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Send to back</span>
        </button>
      </div>
    </div>
  ), [handleBringToFront, handleSendToBack])

  const actionsSection = useMemo(() => (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-500">Actions</h3>
      <div className="flex justify-center gap-2">
        <button
          className="flex items-center gap-2 h-9 py-2 w-24 border rounded-sm shadow-sm cursor-pointer justify-center"
          onClick={handleDuplicate}
        >
          <Copy className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">Duplicate</span>
        </button>
        <button
          className="flex items-center gap-1 h-9 py-2 rounded-sm shadow-sm cursor-pointer bg-red-500 w-24 justify-center"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-white" />
          <span className="text-xs text-white font-semibold">Delete</span>
        </button>
      </div>
    </div>
  ), [handleDuplicate, handleDelete])

  const textPropertiesSection = useMemo(() => (
    objectType === 'text' && (
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-500">Text Properties</h3>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Font Family</p>
          <CustomDropdown
            options={fontFamilies}
            value={fontFamily}
            onChange={handleFontFamilyChange}
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Text Content</p>
          <textarea
            className="resize-none min-h-[150px] placeholder:text-gray-400 placeholder:font-medium font-medium w-full p-2 rounded-md text-gray-400 outline-purple-300 shadow-sm text-lg "
            value={text}
            onChange={handleTextChange}
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Font Size</p>
          <input
            type="number"
            className="w-full p-2 border rounded-md text-gray-700 text-sm"
            value={fontSize}
            onChange={handleFontSizeChange}
            min="1"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Style</p>
          <div className="flex gap-3">
            <button
              className={`w-8 h-8 flex justify-center items-center border rounded-sm cursor-pointer ${
                weight === 'bold' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
              }`}
              onClick={handleToggleBold}
            >
              <Bold className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className={`w-8 h-8 flex justify-center items-center border rounded-sm cursor-pointer ${
                fontStyle === 'italic' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
              }`}
              onClick={handleToggleItalic}
            >
              <Italic className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className={`w-8 h-8 flex justify-center items-center border rounded-sm cursor-pointer ${
                underline ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
              }`}
              onClick={handleToggleUnderline}
            >
              <Underline className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Text Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              style={{backgroundColor: textColor}}
              onChange={handleTextColorChange}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={textColor}
              onChange={handleTextColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Background Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              style={{backgroundColor: textBackgroundColor}}
              value={textBackgroundColor}
              onChange={handleTextBackgroundColorChange}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={textBackgroundColor}
              onChange={handleTextBackgroundColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-gray-500">Letter Spacing</p>
            <span className="text-xs text-gray-500">{letterSpacing}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="1"
            value={letterSpacing}
            onChange={handleLetterSpacingChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
      </div>
    )
  ), [objectType, fontFamily, text, fontSize, weight, fontStyle, underline, textColor, textBackgroundColor, letterSpacing, 
      handleFontFamilyChange, handleTextChange, handleFontSizeChange, handleToggleBold, handleToggleItalic, 
      handleToggleUnderline, handleTextColorChange, handleTextBackgroundColorChange, handleLetterSpacingChange])

  const shapePropertiesSection = useMemo(() => (
    objectType === 'shape' && (
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-500">Shape Properties</h3>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Fill Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fillColor}
              style={{backgroundColor: fillColor}}
              onChange={handleFillColorChange}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={fillColor}
              onChange={handleFillColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Border Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={borderColor}
              onChange={handleBorderColorChange}
              style={{backgroundColor: borderColor}}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={borderColor}
              onChange={handleBorderColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-gray-500">Border Width</p>
            <span className="text-xs text-gray-500">{borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={borderWidth}
            onChange={handleBorderWidthChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Border Style</p>
          <CustomDropdown
            options={borderStyles}
            value={borderStyle}
            overflow
            onChange={handleBorderStyleChange}
          />
        </div>
      </div>
    )
  ), [objectType, fillColor, borderColor, borderWidth, borderStyle, 
      handleFillColorChange, handleBorderColorChange, handleBorderWidthChange, handleBorderStyleChange])

  const imagePropertiesSection = useMemo(() => (
    objectType === 'image' && (
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-500">Image Properties</h3>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Border Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={borderColor}
              onChange={handleBorderColorChange}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={borderColor}
              onChange={handleBorderColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-gray-500">Border Width</p>
            <span className="text-xs text-gray-500">{borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={borderWidth}
            onChange={handleBorderWidthChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Border Style</p>
          <CustomDropdown
            options={borderStyles}
            value={borderStyle}
            overflow
            onChange={handleBorderStyleChange}
          />
        </div> 
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Filter</p>
          <CustomDropdown
            options={imageFilter}
            value={filter}
            onChange={handleImageFilterChange}
            overflow
          />
        </div>
        
        {filter === 'blur' && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-xs font-semibold text-gray-500">Blur Amount</p>
              <span className="text-xs text-gray-500">{blur}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={blur}
              onChange={handleBlurChange}
              className="w-full accent-purple-500 h-[4px]"
            />
          </div>
        )}
      </div>
    )
  ), [objectType, borderColor, borderWidth, borderStyle, filter, blur, 
      handleBorderColorChange, handleBorderWidthChange, handleBorderStyleChange, 
      handleImageFilterChange, handleBlurChange])

  const pathPropertiesSection = useMemo(() => (
    objectType === 'path' && (
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-500">Path Properties</h3>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Stroke Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={pathStrokeColor}
              onChange={handlePathStrokeColorChange}
               style={{backgroundColor: pathStrokeColor}}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={pathStrokeColor}
              onChange={handlePathStrokeColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-gray-500">Stroke Width</p>
            <span className="text-xs text-gray-500">{pathStrokeWidth}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={pathStrokeWidth}
            onChange={handlePathStrokeWidthChange}
            className="w-full accent-purple-500 h-[4px]"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500">Fill Color</p>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={pathFillColor}
              onChange={handlePathFillColorChange}
              className="w-8 h-8 cursor-pointer rounded border border-gray-300"
              style={{backgroundColor: pathFillColor}}
            />
            <input
              type="text"
              value={pathFillColor}
              onChange={handlePathFillColorChange}
              className="flex-1 p-1 border rounded text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    )
  ), [objectType, pathStrokeColor, pathStrokeWidth, pathFillColor, 
      handlePathStrokeColorChange, handlePathStrokeWidthChange, handlePathFillColorChange])

  return (
    <div className="fixed right-0 top-[56px] bottom-0 w-[280px] bg-white border-l border-gray-200 z-10 overflow-y-auto">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Properties</span>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {!selectedObj ? (
          <div className="text-center text-gray-500 py-8">
            Select an object to edit properties
          </div>
        ) : (
          <>
            {sizePositionSection}
            {layerPositionSection}
            {actionsSection}
            {textPropertiesSection}
            {shapePropertiesSection}
            {imagePropertiesSection}
            {pathPropertiesSection}
          </>
        )}
      </div>
    </div>
  )
}

export default Property