import { Input } from "../../components/Input"
import { styleGroupInput } from "../../style/style"

export const Mqc = ({qustion ,event})=>{
    return (
        <div className="mt-5 py-3 space-y-4 px-6 font-ubuntu">
        {
            qustion.map((i,indexs)=><>
           <div key={indexs*10 /2}>
                <Input event={event}  key={indexs*10 / 2} 
                checked={i.selected} 
                value={i.choice} name="quiz" id={i.id} 
                type="checkbox" Text={i.choice}/>
              </div>
            </>)
        }
        </div>

    )
}



