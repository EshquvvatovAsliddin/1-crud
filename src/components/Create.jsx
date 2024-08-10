import React, { useState } from 'react'

const Create = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name };
        await fetch("http://localhost:5000/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });
        setName("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
            />
            <button type="submit" className='text-green-600 shadow-lg border-2 border-black p-0.5 px-4'>Create Item</button>
        </form>
    )
}

export default Create