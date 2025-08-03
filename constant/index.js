import {
    Youtube,
    Image,
    Palette,
    Heart,
    Type,
    Sticker,
    Printer,
    Sparkle,
    Wand2,
    Upload,
    Eye,
    Pencil,
    EraserIcon,
    Paintbrush,
} from 'lucide-react'

export const designTypes =[
    {
        icon: <Youtube className='h-6 w-6 text-white'/>,
        label: 'Youtube Thumbnail',
        bgColor: 'bg-red-500'
        
    },
    {
        icon: <Image className='h-6 w-6 text-white'/>,
        label: 'Logo Design',
        bgColor: 'bg-purple-500'
        
    },
    {
        icon: <Palette className='h-6 w-6 text-white'/>,
        label: 'Color Palette',
        bgColor: 'bg-blue-500'
        
    },
    
    {
        icon: <Type className='h-6 w-6 text-white'/>,
        label: 'Typography',
        bgColor: 'bg-green-500'
        
    },
    {
        icon: <Heart className='h-6 w-6 text-white'/>,
        label: 'Social Media',
        bgColor: 'bg-orange-500'
        
    },
    {
        icon: <Sticker className='h-6 w-6 text-white'/>,
        label: 'Stikers',
        bgColor: 'bg-pink-500'
        
    },
    {
        icon: <Printer className='h-6 w-6 text-white'/>,
        label: 'Printer',
        bgColor: 'bg-purple-500'
        
    },
    {
        icon: <Sparkle className='h-6 w-6 text-white'/>,
        label: 'Ai Background',
        bgColor: 'bg-blue-600'
        
    },
    {
        icon: <Wand2 className='h-6 w-6 text-white'/>,
        label: 'Ai Image Gen',
        bgColor: 'bg-purple-600'
        
    },
    {
        icon: <Upload className='h-6 w-6 text-white'/>,
        label: 'Upload',
        bgColor: 'bg-gray-200'
        
    },
]

export const dropmenu = [
       {
        label: 'Editing',
        value: 'Editing',
        icon: <Pencil className='w-5 h-5'/>
       },
       {
        label: 'Viewing',
        value: 'Viewing',
        icon: <Eye className='w-5 h-5'/>
       },
    ]


export const colorPresets = [
    "#FFFFFF",
    "#F8F9FA",
    "#E9ECEF",
    "#DEE2E6",
    "#000000",
    "#E53935",
    "#DB1860",
    "#8E24AA",
    "#5E3581",
    "#3949AB"
] 

export const textPresets = [
  {
    name: 'Heading',
    Text: 'Add a heading',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-san-serif'
  },
  {
    name: 'Subheading',
    Text: 'Add a subheading',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-san-serif'
  },
  {
    name: 'Body Text',
    Text: 'Add a litle text.',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Inter, sans-san-serif'
  },
  {
    name: 'Caption',
    Text: 'Add a caption.',
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Inter, sans-san-serif',
    fontStyle: 'normal'
  },
]

export const brushSize = [
    {valuse: 2, label: 'small'},
    {valuse: 8, label: 'Medium'},
    {valuse: 10, label: 'Large'},
    {valuse: 20, label: 'Extra Large'},
]

export const drawPanelColorPreset = [
   '#000000',
   '#FFFFFF',
   '#FF0000',
   '#00FF00',
   '#0000FF',
   '#FFDIDC',
   '#FFADAD',
   '#FFD6A5',
   '#FDFFB6',
   '#CAFFBF',
   '#FF9900',
   '#9900FF',
   '#FF00FF',
    "#DB1860",
    "#8E24AA",
    "#5E3581",
 ]

 export const tablet = [
    {
       label: 'Color',
       icon: <Palette className='h-4 w-4 text-gray-300'/>,
       id: 1
    },
    {
       label: 'Brush',
       icon: <Paintbrush className='h-4 w-4 text-gray-300'/>,
       id:2
    },
    {
       label: 'Tools',
       icon: <EraserIcon className='h-4 w-4 text-gray-300'/>,
       id:3
    },
]