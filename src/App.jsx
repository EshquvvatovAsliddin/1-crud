import React from 'react';
import Create from './components/Create';
import Read from './components/Read';

const App = () => {
  const handleDelete = async (id) => { // id parametri qo'shildi
    if (id) { // id mavjudligini tekshiramiz
      await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE"
      });
    } else {
      alert("Hech qanday element tanlanmagan.");
    }
  };

  return (
    <div>
      <Create />
      <Read handleDeletes={handleDelete} />
    </div>
  );
}

export default App;
