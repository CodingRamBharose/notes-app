import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Notecard from '../../components/Cards/Notecard'
import { IoMdAdd } from "react-icons/io";
import Modal from 'react-modal'
import AddEditNote from './AddEditNote';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Layout from '../../components/Layout/Layout';
import logo from "../../assets/logo.jpg"
import EmptyCard from '../../components/EmptyCard/EmptyCard'


const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({ isShow: false, type: "add", data: null, });
  const [allNotes, setAllNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch,setIsSearch] = useState(false)

  const navigate = useNavigate();

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes")
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        filterNote(response.data.notes, activeCategory)
      }

    } catch (error) {
      console.log("an unexpected error occur. please try again")
    }
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => {

    }
  }, [])

  const onEditNote = (noteData) => {
    setOpenAddEditModal({ isShow: true, type: "edit", data: noteData })
  }

  const onDeleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId)
      if (response.data && !response.data.error) {
        getAllNotes();
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("an unexpected error occured, please try again")
      }
    }
  }

  //search notes
  const onSearchNote = async (query)=>{
    try {
      const response = await axiosInstance("/search-notes",{
        params: {query},
      })

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes)
        filterNote(response.data.notes, activeCategory)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleClearSearch = ()=>{
    setIsSearch(false);
    getAllNotes();
  }

  const onModalClose = () => {
    setOpenAddEditModal({ isShow: false, type: "add", data: null })
  }

  // handle filter of catogories
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterNote(allNotes, category);

  };
  const filterNote = (allNotes, category) => {
    if (category === 'all') {
      setFilteredNotes(allNotes);
    } else {
      setFilteredNotes(allNotes.filter(note => note.tag === category));
    }
  };

  return (
    <Layout userInfo={userInfo} onCategoryClick={handleCategoryClick} activeCategory={activeCategory} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}>
      {allNotes.length>0 ?<div className='w-full overflow-y-auto h-[74vh] md:h-[67vh]'>
        {filteredNotes.map((note, index) => (
          <Notecard key={note._id} title={note.title} tag={note.tag} content={note.content} time={note.createdOn} date={note.createdOn} logo={logo} onEditNote={() => onEditNote(note)} onDeleteNote={() => onDeleteNote(note)} />
        ))}
      </div> : <EmptyCard isSearch={isSearch}/>}
      <div className='bg-darkgreen px-2 py-2 text-light text-4xl flex items-center justify-center rounded-md absolute w-[93%] bottom-8'>
        <IoMdAdd className='cursor-pointer hover:text-cream' onClick={() => { setOpenAddEditModal({ isShow: true, type: "add", data: null }) }} />
      </div>
      <Modal isOpen={openAddEditModal.isShow}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[90%] md:w-[40%] mt-[17vh] md:mt-20 max-h-3/4 bg-light rounded-md mx-auto p-5 overflow-scroll"
      >
        <AddEditNote getAllNotes={getAllNotes} onModalClose={onModalClose} type={openAddEditModal.type} noteData={openAddEditModal.data} />
      </Modal>
    </Layout>
  )
}

export default Home
