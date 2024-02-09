

export default function HeaderBar ({render , title}) {


    return <>
     <div className="bg-exam shadow-sm text-[24px] 2xl:h-[15rem] py-[3rem] text-gray-700 
    lg:mx-0 items-center gap-1 mt-[3.5rem]">
      <span className="flex justify-center">
        <span className="text-center font-roboto space-y-2 ">
        <h1 className="text-[28px] font-semibold text-variation-500">{render ? title ? title : "Questions" : 'examination rule'}</h1>
      <p className="text-[14.5px] text-gray-600 mx-3 font-sans lg:mx-0 tracking-wider">
      {render ? 'Please choose section name before continue' : 'Please read rule before continue...'}</p>
        </span>
      </span>
    </div>
    
    </>


}