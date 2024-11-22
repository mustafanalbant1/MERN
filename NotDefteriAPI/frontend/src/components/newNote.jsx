import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAsync, setSelectedColor } from '../redux/acctions';
import { RxCross2 } from "react-icons/rx";

const NewNote = () => {
    const dispatch = useDispatch();
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const noteColor = useSelector((state) => state.notes.selectedColor);





    const handleAddNote = (e) => {
        e.preventDefault();

        if (noteContent.trim() === '') {
            alert('Note content cannot be empty!');
            return;
        }

        const newNote = {
            title: noteTitle,
            content: noteContent,
            color: noteColor,
        };

        dispatch(addNoteAsync(newNote));
        dispatch(setSelectedColor(''));
        setNoteTitle('');
        setNoteContent('');
    };

    return (
        <div className="flex justify-center items-center max-h-screen max-w-screen relative">
            <form onSubmit={handleAddNote}>
                <div
                    style={{ backgroundColor: noteColor }}
                    className="w-[300px] h-[250px] flex flex-col justify-between p-5 rounded-[20px] m-5"
                >
                    <div className="flex flex-col">
                        <div className='flex flex-row justify-between'>
                            <input
                                className="bg-transparent border-none outline-none"
                                type="text"
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                placeholder="Note Title"
                            />
                            <div>
                                <div>
                                    <RxCross2 onClick={() => dispatch(setSelectedColor(''))} />
                                </div>

                            </div>
                        </div>

                        <br />
                        <input
                            className="bg-transparent border-none outline-none mt-5"
                            type="text"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Note Desc"
                        />
                    </div>

                    <button type="submit" className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md">
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewNote;
