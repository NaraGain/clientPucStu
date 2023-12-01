import {Audio} from "../../../components/Audio"
import {Image} from "antd"

export const RenderFile = ({path ,type})=>{
    return <div className="py-4">
    {
        type === "image/png" ?
         <Image className="rounded-lg border border-neutral-200 object-cover" height={100} width={300} src={path}/>
          : <audio controls src={process.env.REACT_APP_API_KEY + path}/>
    }
    </div>
}