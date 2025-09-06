 import MainPage from '@/section/MainPage'
 
 const HomePage = async (props) => {

   const searchParam = await props.searchParams

   const query = (searchParam?.query) || ''
   const category = (searchParam?.dropDowm) || ''

   return (
     <MainPage query={query} category={category}/>
   )
 }
 
 export default HomePage