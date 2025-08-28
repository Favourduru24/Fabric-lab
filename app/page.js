 import MainPage from '@/section/MainPage'
 
 const HomePage = async (props) => {

   const searchParam = await props.searchParams

   const query = (searchParam?.query) || ''

   return (
     <MainPage query={query}/>
   )
 }
 
 export default HomePage