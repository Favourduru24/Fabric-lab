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
    Home,
    FolderOpen,
    CreditCard,
    Mail,
    SparklesIcon,
    Images,
    TypeOutline,
    HeartHandshake,
    PrinterCheck,
    Sparkles,
    UploadCloud,
    LucideWand2,
    Video,
    DramaIcon,
    Shapes
} from 'lucide-react'


export const designTypes =[
    {
        icon: <Youtube className='h-6 w-6 text-white'/>,
        icons: <Video className='h-6 w-6 text-white'/>,
        label: 'Youtube Thumbnail',
        bgColor: 'bg-red-500',
        width: 900,
        height: 500
        
    },
    {
        icon: <Image className='h-6 w-6 text-white'/>,
        icons: <Images className='h-6 w-6 text-white'/>,
        label: 'Logo Design',
        bgColor: 'bg-purple-500',
        width: 400,
        height: 465
        
    },
    {
        icon: <Palette className='h-6 w-6 text-white'/>,
        icons: <Shapes className='h-6 w-6 text-white'/>,
        label: 'Color Palette',
        bgColor: 'bg-blue-500',
        width: 500,
        height: 500
    },
    
    {
        icon: <Type className='h-6 w-6 text-white'/>,
        icons: <TypeOutline className='h-6 w-6 text-white'/>,
        label: 'Typography',
        bgColor: 'bg-green-500',
        width: 200,
        height: 200       
    },
    {
        icon: <Heart className='h-6 w-6 text-white'/>,
        icons: <HeartHandshake className='h-6 w-6 text-white'/>,
        label: 'Social Media',
        bgColor: 'bg-orange-500',
        width: 825,
        height: 465,
    },
    {
        icon: <Sticker className='h-6 w-6 text-white'/>,
        icons: <DramaIcon className='h-6 w-6 text-white'/>,
        label: 'Stikers',
        bgColor: 'bg-pink-500',
         width: 250,
        height: 250,
    },
    {
        icon: <Printer className='h-6 w-6 text-white'/>,
        icons: <PrinterCheck className='h-6 w-6 text-white'/>,
        label: 'Printer',
        bgColor: 'bg-purple-500'
        
    },
    {
        icon: <Sparkle className='h-6 w-6 text-white'/>,
        icons: <Sparkles className='h-6 w-6 text-white'/>,
        label: 'Ai Background',
        bgColor: 'bg-blue-600'
        
    },
    {
        icon: <Wand2 className='h-6 w-6 text-white'/>,
        icons: <LucideWand2 className='h-6 w-6 text-white'/>,
        label: 'Ai Image Gen',
        bgColor: 'bg-purple-600'
        
    },
    {
        icon: <Upload className='h-6 w-6 text-white'/>,
        icons: <UploadCloud className='h-6 w-6 text-white'/>,
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
    {value: 2, label: 'small'},
    {value: 8, label: 'Medium'},
    {value: 10, label: 'Large'},
    {value: 20, label: 'Extra Large'},
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

 export const fontFamilies = [
    {
        value: "Arial",
        label: "Arial",
    },
    {
     value: "Helvetica",
     label: "Helvetica",
    },
    {
     value: "Times New Roman",
     label: "Times New Roman",
    },
    {
     value: "Courier New",
     label: "Courier New",
    },
    {
     value: "Verdana",
     label: "Verdana",
    },
    {
     value: "Comic Sans MS",
     label: "Comic Sans MS",
    },
    {
     value: "Impact",
     label: "Impact",
    }
 ]

 export const borderStyles = [
    {
        value: "solid",
        label: "solid",
    },
    {
     value: "dashed",
     label: "dashed",
    },
    {
     value: "dotted",
     label: "dotted",
    }
 ]

 export const imageFilter = [
    {
        value: "none",
        label: "none",
    },
    {
     value: "grayscale",
     label: "grayscale",
    },
    {
     value: "sepia",
     label: "sepia",
    },
    {
     value: "invert",
     label: "invert",
    },
    {
     value: "blur",
     label: "blur",
    },
 ]

 export const Catalog = [
    {
        label: 'Your Design',
        id: 1,
        icon: <Images className="w-5 h-5 text-gray-500 font-thin"/>
    },
    {
        label: 'Template',
        id: 2,
        icon: <Mail className="w-5 h-5 text-gray-500 font-thin"/>
    },
    {
        label: 'Fabric-lab AI',
        id: 3,
        icon: <SparklesIcon className="w-5 h-5 text-gray-500 font-thin"/>
    },
     
 ]

 export const NavLinks = [
    {
        icon: <FolderOpen className="h-6 w-6 "/>, label: 'Projects', active: false
    },
    {
        icon: <CreditCard className="h-6 w-6 "/>, label: 'Billing', active: false
    },
 ]