import { useState, useEffect } from "react";
import Modal from "./Modal";

const Read = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("http://localhost:5000/items");
            const data = await response.json();
            setItems(data);
        };

        fetchItems();
    }, []);

    const handleUpdate = async () => {
        if (selectedItemId) {
            const updatedItem = { name };
            await fetch(`http://localhost:5000/items/${selectedItemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedItem)
            });
        } else {
            console.log("Hech qanday element tanlanmagan.");
        }
    };

    const handleDeletes = async (id) => {
        if (id) {
            await fetch(`http://localhost:5000/items/${id}`, {
                method: "DELETE"
            });
            setItems((prevItems) => prevItems.filter(item => item.id !== id));
            console.log(`Deleted item with ID: ${id}`);
        } else {
            console.log("Hech qanday element tanlanmagan.");
        }
    };

    const handleItemClick = (id) => {
        setSelectedItemId(id);
        setOpenModal(true); // Modalni ochish
    };

    return (
        <>
            <div>
                <ol>
                    {items.map(item => (
                        <li key={item.id} onClick={() => handleItemClick(item.id)} className="border-2 border-white w-[180px] pl-2 pb-1 my-4 active:bg-green-500 hover:bg-green-300 transition duration-[.3s]">
                            {item.name}
                        </li>
                    ))}
                </ol>
            </div>

            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                />
                <button onClick={handleUpdate} className='text-yellow-500 shadow-lg border-2 border-black p-0.5 px-4'>Update Item</button>
            </div>

            {/* Modal komponenti */}
            <Modal handleDeletes={handleDeletes} selectedItemId={selectedItemId}/>
        </>
    );
};

export default Read;
