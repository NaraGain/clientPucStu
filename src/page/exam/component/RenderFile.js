import {Image} from "antd"

export const RenderFile = ({path ,type})=>{
    const fileType = type.split("/").map((part ,index)=> index === 1 ? part.replace(part, '') : part).join('/')
    const name = fileType
    return <div className="py-4">
    {
        fileType === "image/" ?
         <Image className="rounded-lg border border-neutral-200 object-cover" height={100} width={300} 
         src={process.env.REACT_APP_API_KEY + path}/>
          : <audio controls src={process.env.REACT_APP_API_KEY + path}/>
    }
    </div>
}