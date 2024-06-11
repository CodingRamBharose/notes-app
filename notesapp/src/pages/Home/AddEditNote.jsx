import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import Catagory from '../../components/Catogory/Catagory';

const AddEditNote = ({noteData, type, getAllNotes, onModalClose}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tag,setTag] = useState(noteData?.tag || "")
    const [error,setError] = useState(null)

    // add New Note
    const addNewNote = async()=>{
      try {
        const response = await axiosInstance.post("/add-note",{
          title,
          content,
          tag,
        })
        if(response.data && response.data.note){
          toast.success("New Note Added Succesfully")
          getAllNotes();
          onModalClose();
        }
        
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }
        
      }
        
    }
    const editNote = async()=>{
      const noteId = noteData._id;
      try {
        const response = await axiosInstance.put("/edit-note/" + noteId,{
          title,
          content,
          tag,
        })
        if(response.data && response.data.note){
          toast.success("Note Edited Succesfully")
          getAllNotes();
          onModalClose();
        }
        
      } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }
      }

    }

    const addHandleNote = ()=>{
        if(!title){
            setError("Please Enter Title")
            return;
        }
        if(!content){
            setError("Please Enter content")
            return;
        }
        if(!tag){
            setError("please enter tag")
            return;
        }
        setError("")
        if(type==="edit"){
            editNote()
        }else{
            addNewNote()
        }
    }

  return (
    <div className='relative flex flex-col gap-2'>
        <button className='absolute top-0 right-0' onClick={onModalClose}>
            <IoMdClose className='text-2xl'/>
        </button>
      <div className='flex gap-1 flex-col'>
        <label className='text-md'>TITLE</label>
        <input type="text" className='input' placeholder="Try typing 'complete project by friday 6 pm'"
        value={title} onChange={({target})=>{setTitle(target.value)}}/>
      </div>
      <div>
        <label className='text-md'>CONTENT</label>
        <textarea type="text" rows={6} className='input'
        value={content} onChange={({target})=>{setContent(target.value)}}/>
      </div>
      <div>
        <Catagory tag={tag} setTag={setTag}/>
      </div>
      {error && <p className='text-red-400 text-center'>{error}</p>}
      <button className='btn-primary' onClick={addHandleNote}>{type==="edit"? "Update":"Add"}</button>
    </div>
  )
}

export default AddEditNote
