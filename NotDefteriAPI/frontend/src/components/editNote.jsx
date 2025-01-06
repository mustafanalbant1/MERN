import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, updateNoteAsync } from '../redux/acctions';
import { RxCross2 } from "react-icons/rx";
import { setEditNoteData, setUpdateNote } from '../redux/noteSlice';
import { useEffect } from 'react';

const EditNote = () => {
    const dispatch = useDispatch();
    const { id, title, content, color } = useSelector((state) => state.notes.updateNoteData);


    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setEditNoteData({ [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!id) {
            console.error("Note ID is not available.");
            return;
        }

        // Notu güncelle
        dispatch(updateNoteAsync({ id, title, content, color }))
            .then(() => {
                // Güncellenmiş notları yeniden alıyoruz
                dispatch(fetchNotes());
            });

        // Not düzenleme verilerini sıfırla
        dispatch(setEditNoteData({ title: '', content: '', color: '', id: null }));
        dispatch(setUpdateNote(false));  // Güncelleme modunu kapat
    };


    return (
        <div className="flex justify-center items-center max-h-screen max-w-screen relative">
            <form onSubmit={handleSave}>
                <div
                    style={{ backgroundColor: color }}
                    className="w-[300px] h-[250px] flex flex-col justify-between p-5 rounded-[20px] m-5"
                >
                    <div className="flex flex-col">
                        <div className='flex flex-row justify-between'>
                            <input
                                className="bg-transparent border-none outline-none"
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                            />
                            <div>
                                <RxCross2
                                    onClick={() => dispatch(setUpdateNote(false))}
                                    className="text-gray-500 cursor-pointer"
                                />
                            </div>
                        </div>

                        <br />
                        <input
                            className="bg-transparent border-none outline-none mt-5"
                            type="text"
                            name="content"
                            value={content}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNote;
