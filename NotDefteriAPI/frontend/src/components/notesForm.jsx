import { useSelector } from 'react-redux';
import ColorSchema from './colorSchema';
import NewNote from './newNote';
import NoteList from './noteList';
import Title from './Title';
import { useState, useEffect } from 'react';
import FilterNote from './filterNote';
import EditNote from './editNote';

const NotesForm = () => {
    const [addVisible, setAddVisible] = useState(false);
    const noteColor = useSelector((state) => state.notes.selectedColor);
    const updateNote = useSelector((state) => state.notes.setUpdateNote)


    useEffect(() => {
        if (noteColor) {
            setAddVisible(true);
        } else {
            setAddVisible(false);
        }
    }, [noteColor]);
    return (
        <div className='w-screen h-screen bg-[#A6AEBF] flex items-center justify-center gap-5'>
            <div className='w-full h-full max-w-[85%] max-h-[90%] bg-white flex flex-row rounded-[30px] shadow-lg relative'>
                <div className='w-[120px] border-r-2 p-4 flex flex-col items-center'>
                    <ColorSchema />
                </div>

                {
                    addVisible && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <NewNote />
                    </div>
                }
                {
                    updateNote && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <EditNote />
                    </div>
                }



                <div className='flex-1 flex flex-col'>

                    <div className='items-center p-3 ml-5'>
                        <FilterNote />
                        <Title />
                    </div>
                    <div className='flex-1 overflow-y-auto p-4 ml-8'>
                        <NoteList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesForm;
