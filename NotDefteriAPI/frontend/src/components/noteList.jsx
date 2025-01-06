import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiMenuLine } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, removeNoteAsync } from "../redux/acctions";
import { setEditNoteData, setUpdateNote } from "../redux/noteSlice";


const NoteList = () => {
    const dispatch = useDispatch();
    const [menuVisibleId, setMenuVisibleId] = useState(null);


    const handleRemoveNote = (noteId) => {
        if (!noteId) {
            console.error('Silinecek notun ID\'si eksik');
            return;
        }

        dispatch(removeNoteAsync(noteId)) // Asenkron remove işlemi
            .then(() => {
                dispatch(fetchNotes()); // Not silindikten sonra verileri tekrar çekiyoruz
            })
            .catch((error) => {
                console.error('Not silinirken bir hata oluştu:', error);
            });

    };


    const handleEditNote = (note) => {
        dispatch(setUpdateNote(true))
        dispatch(setEditNoteData({
            id: note._id,
            title: note.title,
            content: note.content,
            color: note.color
        }));

    };





    const notes = useSelector((state) => {
        return state.notes.filteredNotes.length > 0 ? state.notes.filteredNotes : state.notes.items;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return (
        <div className="w-full flex flex-wrap">
            {notes.map((note, index) => (
                <div key={index} className={`w-[300px] h-[250px] flex flex-col justify-between bg-${note.color}-300 p-5 rounded-[20px] m-5 relative`}>
                    <div>
                        <div className="text-[20px] font-semibold font-bold">{note.title}</div>
                        <div>{note.content}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center relative">
                        <div className="flex-shrink-0 text-sm flex items-center justify-center">
                            {formatDate(note.createdAt)}
                        </div>

                        {/* Menü İkonları */}
                        <div className="relative">
                            {menuVisibleId === note._id && (
                                <div className="absolute bottom-8 right-0 mb-2 flex flex-col items-center bg-black rounded-full p-2 shadow-lg z-10">
                                    <RxCross2
                                        onClick={() => handleRemoveNote(note._id)}
                                        size={20}
                                        className="text-white cursor-pointer mb-2"
                                    />
                                    <MdModeEditOutline
                                        onClick={() => handleEditNote(note)}
                                        size={20}
                                        className="text-white cursor-pointer"
                                    />


                                </div>
                            )}

                            {/* Menü Butonu */}
                            <div className="bg-black text-white rounded-full p-2 shadow-lg">
                                <RiMenuLine
                                    onClick={() =>
                                        setMenuVisibleId(menuVisibleId === note._id ? null : note._id)
                                    }
                                    size={20}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;