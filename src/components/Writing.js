import React, { useEffect, useState } from "react";
import Aos from "aos"
import 'aos/dist/aos.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button ,Upload, message ,Input, Form, Tabs} from 'antd';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { questionAction } from "../redux/questionSlice";
import axiosInstance from "../api";
import { loadingAction } from "../redux/loaderSlice";




export default function Writing ({score ,qid, answer}){
const [disable ,setDisable] = useState(false)
const [fileList, setFileList] = useState([]);
const [uploading, setUploading] = useState(false);
const [text ,setText] = useState('')
const [wordCount ,setWordCount] = useState(0)
const location = useLocation()
const searchParams = new URLSearchParams(location.search)
const name = searchParams.get('name')
const [form] = Form.useForm();
const {TextArea} = Input
const dispatch = useDispatch()



//handle upload file writing function
const handleUpload = async () => {
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('file', file);
  });
  setUploading(true);
  await axiosInstance.post(`${process.env.REACT_APP_API_KEY}report/upload`, formData)
    .then((res) => {
      dispatch(loadingAction.ShowLoading())
      setFileList([]);
      dispatch(questionAction.addWritingToReport({
        subjectName : name,
        formData : res.data.path,
        sectionScore : score,

      }))
      dispatch(questionAction.handleChangeBlank({
        qid : qid,
        title : name,
        answer : `${process.env.REACT_APP_API_KEY}`+res.data.path
      }))
      message.success('upload successfully.');
      dispatch(loadingAction.HideLoading())
    })
    .catch((error) => {
      message.error(error.response.data);
    })
    .finally(() => {
      setUploading(false);
      dispatch(loadingAction.HideLoading())
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


//function that store student wirting by handle in state
const handleChangeWritingAsText =(value)=>{
  dispatch(questionAction.addWritingToReport(value))
  dispatch(questionAction.handleChangeBlank({
    qid : qid,
    title : name,
    answer : value
  }))
}

//function fill form
const handeFillForm = (value) =>{
  form.setFieldsValue(value)
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
   if(answer){
     handeFillForm(answer)
     setDisable(true)
   }
 },[text , handeFillForm])
const items = [
  {
    key: '1',
    label: 'Writing',
    children:  <div className="my-5">
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
    rows={7}
    spellCheck={false}
    onChange={(e)=>{recalculate(e)}}
    onPaste={(e)=> {
      e.preventDefault()
      message.error("could not pass text")
      }}/>
</Form.Item>
<div className="flex justify-between">
<Form.Item className="m-0 p-0" initialValue={name}
name={"subjectName"}></Form.Item>
<Form.Item className="flex justify-end">
<Button
disabled={disable}
className="bg-variation-500 text-white"  
htmlType="submit">Submit</Button>
</Form.Item>
      </div>
</Form>
 
    </div> 
  },
  {
    key: '2',
    label: 'Upload File',
    children: <>
    <div className="mt-4 py-5 relative">
    <>
      <Upload 
      {...props}
      listType="picture-circle">
        <Button icon={<UploadOutlined />}></Button>
      </Upload>
      <Button
        className="bg-variation-500 text-white "
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
            </div> 
    </>,
  },
 ]



 
    return <div className="bg-white px-4 shadow-sm 
     my-4 rounded-lg lg:border-none border-[1px] border-neutral-200">
      <Tabs defaultActiveKey="1" items={items}></Tabs>
     </div>
 
}

