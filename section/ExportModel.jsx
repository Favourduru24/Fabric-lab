'use client'
import { exportAsJson, exportAsPdf, exportAsPng, exportAsSVG } from '@/services/export-service'
import { useEditorStore } from '@/store'
import { Download, File, FileIcon, FileImage, FileJson, Loader, Loader2, X} from 'lucide-react'
import { useState } from 'react'

const ExportModel = ({isOpen, onChange, isClosed}) => {

  
 const {canvas} = useEditorStore()
 const [click, setClick] = useState({
    id: 'png',
    name: 'PNG Image',
    icon: FileImage,
    description: 'Best for web and social media'
  },)

 const [isExprting, setIsExporting] = useState(false)

 const exportFormat = [
  {
    id: 'png',
    name: 'PNG Image',
    icon: FileImage,
    description: 'Best for web and social media',
    color: 'text-purple-600'
  },
  {
    id: 'svg',
    name: 'SVG Vector',
    icon: FileIcon,
    description: 'Scalable vector format',
    color: 'text-pink-600'

  },
  {
    id: 'pdf',
    name: 'PDF Document',
    icon: File,
    description: 'Best for printing',
    color: 'text-green-600'

  },
  {
    id: 'json',
    name: 'JSON Template',
    icon: FileJson,
    description: 'Editable template format',
    color: 'text-red-600'

  },
 ]

  const handleExport = async () => {
    if(!canvas) return

     setIsExporting(true)
      
     try {
       let successFlag = false
        
        switch (click.id) {
          case 'json':
              successFlag = exportAsJson(canvas, 'JSON FileName')   
            break;
          case 'png':
              successFlag = exportAsPng(canvas, 'PNG FileName')   
            break;
          case 'svg':
              successFlag = exportAsSVG(canvas, 'SVG FileName')   
            break;
          case 'pdf':
              successFlag = exportAsPdf(canvas, 'PDF FileName')   
            break;
          default:
            break;
        }

        if(successFlag) {
           setTimeout(() => {
               isClosed(false)
           }, 500)
        }
     } catch(e) {
     console.error('Error exporting file', e)
     } finally {
      setIsExporting(false)
    }
  }

   

 if(!isOpen) return null

  return (
    <>
    {
      isOpen && (
        <div className='inset-0 fixed bg-black/50 flex items-center justify-center z-50'>
          <div className='max-w-md w-full h-fit bg-white rounded-md shadow-sm shadow-white ring-3 relative '>
             <X className='w-5 text-black h-5 border rounded-sm absolute top-0 right-0 cursor-pointer' onClick={onChange}/>
             <div className='flex flex-col p-2'>
             <h3 className='text-xl text-gray-600 fon-semibold'>Export Design</h3>
                <div className='py-4'>
                     <h3 className="text-sm font-medium mb-3 text-gray-500">Choose Format:</h3>   
                     <div className="grid grid-cols-2 gap-3">
                          {exportFormat.map((exportFmt) => (
                            <div className={`cursor-pointer border transition-colors p-4 hover:bg-accent hover:text-accent-foreground ${click.id === exportFmt.id ? 'ring-2 rounded-md shadow-sm bg-gray-50' : 'border rounded-md shadow-sm'}`} 
                            onClick={() => setClick(exportFmt)}
                            key={exportFmt.id}>
                                <div className={`p-4 flex flex-col items-center text-center`}>
                                     <exportFmt.icon className={`h-8 w-8 mb-2 ${click.id === exportFmt.id ? `text-gray-700 ${exportFmt.color}` : 'text-gray-500'} `}/>
                                      <h4 className='font-medium text-[1rem] text-gray-700'>{exportFmt.name}</h4>
                                      <p className='mt-1 text-gray-500 text-sm'>{exportFmt.description}</p>
                                </div> 
                            </div>
                          ))}
                     </div>

                     <div className='flex w-full justify-between items-center mt-8 '>
                         <button onClick={onChange} className='shadow-sm p-3 rounded-sm text-gray-600 font-semibold text-sm cursor-pointer border border-gray-100'>Cancel</button>
                         <button onClick={handleExport}>
                          {  isExprting ? (
                            <span className='flex items-center gap-2'>
                              <Loader2 className='w-5 h-5 text-gray-500'/>
                              Exporting...
                            </span> 
                          ) : (
                               <span className='flex items-center gap-2 shadow-sm p-3 rounded-md border cursor-pointer bg-purple-500'>
                              <Download className='w-5 h-5 text-white'/>
                              <p className='text-white text-md font-semibold'>Export {click.id}</p> 
                               </span>
                          )}
                         </button>
                     </div>
                </div>
             </div>
          </div>  
        </div>
      )
    }
  
    </>
  )  
}

export default ExportModel