export const apiSlice=(set,get)=>({
  apiRequestCount:0,
  loading:false,
  
  apiBeginRequest:()=>{
    let apiRequestCount=get().apiRequestCount;
    ++apiRequestCount;
    const loading=apiRequestCount>0;
    set({apiRequestCount,loading},undefined, "apiBeginRequest");
  },
  apiEndRequest:()=>{
    let apiRequestCount=get().apiRequestCount;
    --apiRequestCount;
    if (apiRequestCount<0){
      apiRequestCount=0;
    }
    const loading=apiRequestCount>0;
    set({apiRequestCount,loading},undefined, "apiBeginRequest");
  }
  
})
export default apiSlice;

