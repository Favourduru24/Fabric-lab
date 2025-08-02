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
    Pencil
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