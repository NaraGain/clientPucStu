import {BiCopyright, BiListCheck} from "react-icons/bi"
import {Link} from "react-router-dom"
import Icon from "../Icon"



const FoostList = (props, key) => {
    return <>
    <Link to={props.link}>
        <a className="text-[18px] font-mono text-black">{props.text}</a>
    </Link>
     </>
}

const footerList = [
{text:'2022 TestQuize',link:"/#"},
{text:'Privacy',link:"/Privacy"},
{text:'blog',link:"/blog"},
{text:'Term',link:"/term"},
{text:'Security',link:"/Security"},
{text:'Privacy',link:"/Privacy"},
{text:'About us',link:"/about"},,
{text:'Contact us',link:"/contact"}]

export default function SmallFooter  (props)  {


    return <span className=" md:flex space-x-4 items-center container mx-auto py-5">
        <div className="flex space-x-2 items-center">
            <div className="">
                <Icon Size="1.2rem" name={<BiCopyright/>}></Icon>
            </div>
        </div>
      {
        footerList.map((items, key)=><FoostList key={key} link={items.link} text={items.text}/>)
      }
    </span>
}