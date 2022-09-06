import React,{useState,useEffect,useCallback} from 'react'
import { installed } from './data/installed'
import { uninstalled } from './data/uninstalled'
import ReactTimeAgo from 'react-time-ago'

const App = () => {
 
  let count=0
  const[header,setHeader]=useState('Installed SDK\'s')
   const{data:{installedSdks}}=installed    
  const{data:{uninstalledSdks}}=uninstalled  
  const[latestUpdate,setLatestUpdate]=useState(installed.data.latestUpdatedDate)
  const[list,setList]=useState(installedSdks) 
  const[total,setTotal]=useState(installedSdks.length)

  //for styling selected button
  const[installedActive,setInstalledActive]=useState(true)
  const[uninstalledActive,setUninstalledActive]=useState(false)


  //handles clicking the installedSdks button
  const installedBtn_Click=()=>{  
    setHeader('Installed SDK\'s')  
     setList(installedSdks) 
     if(uninstalledActive){
      setUninstalledActive(false)
      setInstalledActive(true)
     }  
     setTotal(installedSdks.length)
     setLatestUpdate(installed.data.latestUpdatedDate)
  }

    //handles clicking the uninstalledSdks button
  const uninstalledBtn_click=()=>{
    setHeader('Uninstalled SDK\'s')
    setList(uninstalledSdks)
    if(installedActive){
      setInstalledActive(false)
      setUninstalledActive(true) 
    }
    setTotal(uninstalledSdks.length) 
    setLatestUpdate(uninstalled.data.latestUpdatedDate)
  }

  const[data,setData]=useState([])

 const generateNames=useCallback(()=>{
    const unique=new Set()   
    list.map(item=>unique.add(item.categories[0]))    
    const myArray=Array.from(unique)
    setData(myArray)    
 },[list])
 
 //get unique item names from the list
 useEffect(()=>{
    generateNames()
 },[generateNames])

  
  return (
    <div className='w-full h-[100vh] md:flex justify-center items-center text-blue-900'>
      <div className='w-full h-full md:w-[90%] md:h-[86%] md:flex justify-center items-center border-2 border-slate-200'>
        <div className='md:w-[80%] md:h-[90%] '>
            <div className='w-[full] h-[20%] flex justify-start items-start pt-3'>

               <button  className={`bg-white border-2 border-blue-500 px-6 py-[6px] rounded-l-full border-r-0 text-blue-700 ${installedActive ?'underline':'no-underline'} `} onClick={installedBtn_Click}>Installed</button>

              <button className={`bg-white border-2 border-blue-500 px-6 py-[6px] rounded-r-full border-l-[1px] text-blue-700 ${uninstalledActive ?'underline':'no-underline'}`} onClick={uninstalledBtn_click}>Uninstalled</button>
            </div>

            <div className='w-[full] h-[80%] border-[3px] border-blue-700 p-3 flex flex-col'>
              <div className='w-full flex justify-between'>
              <h3 className='text-xl font-semibold text-blue-700 mb-3'>{header}</h3>
              <span  className='text-xl font-semibold text-blue-700 mb-3'>{total}</span>
              </div>
              <div className='mb-2'><span>Latest Update <ReactTimeAgo date={latestUpdate} locale="en-US"/></span></div>
              <div className='w-full h-[100%] flex flex-col   flex-wrap'>
              
              {
                 
                data?.sort()?.map((item,i)=>(<div key={i} className='pb-1 text-sm'><span className='underline font-semibold'>{item}</span>
                
                {
                  list.filter(stuff=>stuff.categories.includes(item)).map((x,i)=>(<div key={i} className='block'>SDK {++count} <span>  <ReactTimeAgo date={x.lastSeenDate} locale="en-US"/></span> </div> ))
                }
                </div>))
              }
              </div>
            </div>
        </div>
      </div>
    </div> 
  )
}

export default App