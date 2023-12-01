import React, { useEffect, useState } from "react";
import axios, { formToJSON } from 'axios';
import { TextArea } from "./textArea";
import Aos from "aos"
import 'aos/dist/aos.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button ,Upload, message ,Input, Form} from 'antd';
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { questionAction } from "../redux/questionSlice";




export default function Writing ({e_id , user_id}){
const [stateChange ,setState] = useState(false)
const [fileList, setFileList] = useState([]);
const [uploading, setUploading] = useState(false);
const [text ,setText] = useState('')
const [wordCount ,setWordCount] = useState(0)
const {name} = useParams()
const [form] = Form.useForm();
const {TextArea} = Input
const dispatch = useDispatch()
const handleUpload = () => {
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('file', file);
    console.log(file)
  });
  setUploading(true);

  axios.post(`${process.env.REACT_APP_API_KEY}report/upload`, formData)
    .then((res) => {
      setFileList([]);
      dispatch(questionAction.addWritingToReport({
        subjectName : name,
        formData : res.data.path

      }))
      message.success('upload successfully.');
    })
    .catch((error) => {
      console.log(error.response)
      message.error(error.response.data);
    })
    .finally(() => {
      setUploading(false);
    });
};


const props = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    setFileList([...fileList, file]);
    return false;
  },
  fileList,
}

const recalculate = (e) => {
  setText(e.target.value);
};


const handleChangeWritingAsText =(value)=>{
  dispatch(questionAction.addWritingToReport(value))
}

useEffect(()=>{
  const word = text.split(' ')
  let wordCount =  0
  word.forEach((word)=>{
      if(word.trim() !== ''){
          wordCount++
      }
  })
  setWordCount(wordCount)
   Aos.init({duration:2000})
 },[text])
 
    return <div className="bg-white p-4 
     mt-2 rounded-md border-[1px] border-neutral-200">
         <div className="w-full h-[2rem] space-x-4 mt-3  tracking-wider">
   <button className={styleWriting.switchBtn}
    onClick={()=> setState(!stateChange)}>
     {stateChange ? "Write" : "upload file"}
   </button>
</div>
    {
   stateChange ? <div className="mt-4 relative w-full " dat-aos= "fade-up">
    <>
      <Upload {...props}   listType="picture-circle">
        <Button icon={<UploadOutlined />}></Button>
      </Upload>
      <Button
        className="bg-variation-500 text-white rounded-full"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Submit'}
      </Button>
    </>
    <br />
            </div> : <div className="my-5">
            <p className="text-end text-[16px]
    font-sans text-gray-600">{wordCount}/200</p>
    <Form
    name = "wirtingform"
    form={form}
    onFinish={handleChangeWritingAsText}
    >
      <Form.Item name={"formData"}>
      <TextArea
            placeholder="write here"
            maxLength={200}
            rows={5}
            spellCheck={false}
            onChange={(e)=>{recalculate(e)}}
            onPaste={(e)=> {
              e.preventDefault()
              message.error("could not pass text")
              }}/>
      </Form.Item>
      <Form.Item className="" initialValue={name}
       name={"subjectName"}></Form.Item>
      <Form.Item>
      <Button
       className="bg-variation-500 w-full text-white"  
       htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
         
            </div> 
         }


     </div>
 
}

const styleWriting = {
   "main" : "rounded-lg w-full  space-y-2 h-[100%]",
   "container" : "w-full shadow-gray-500/100 rounded-xl",
   "divtag2" : "",
   "divtag3 " : "bg-white rounded-t-lg ",
   "divtag4" : " flex pl-0 space-x-1 sm:pl-2",
   "textarea" : "w-full rounded-lg tracking-widest text-sm border-[1px] border-gray-300 border-dashed text-gray-900 bg-white p-2  ",
   "divtag5" : "flex items-center justify-between px-3 mt-1  ",
   "btn-style" : " inline-flex items-center py-2 px-4 text-xs font-medium text-center "
   +" text-white bg-purple-800 rounded-[4px] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800",
   "label-style" : "inline-flex justify-center cursor-pointer p-2 ",
   "input-style" : " ", 
   "switchBtn" : "max-w-sm px-2 tracking-wide py-1.5 text-[14px] bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-gray-50 text-gray-800 ",   
}