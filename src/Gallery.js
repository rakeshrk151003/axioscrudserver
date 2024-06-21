import React, { useEffect, useState } from "react";
import axios from "axios";
const Gallery = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [datas, setDatas] = useState([]);

  const [id, setId] = useState(null);
  const handlePost = () => {
    axios
      .post("http://localhost:3001/users", { name, about, imageUrl })
      .then(() => {
        alert("data saved successfully");
        setName("");
        setAbout("");
        setImageUrl("");
      })
      .catch((e) => {
        console.log("error: ${e}");
      });
  };

  
  useEffect(() => {
    const handleRead = () => {
      axios
        .get("http://localhost:3001/users")
        .then((res) => {
          setDatas(res.data);
          console.log(res);
        })
        .catch(() => {
          console.log("error");
        });
    };
    handleRead();
  });

  const handleEdit = (userid) => {
    setId(userid.id);
    setName(userid.name);
    setAbout(userid.about);
    setImageUrl(userid.imageUrl);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/users/${id}`, { name, about, imageUrl })
      .then(() => {
        alert("data updated successfully");
      })
      .catch(() => {
        alert("Data not uploaded");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`).then(()=>{
      alert("data deleted successfully");
    }).catch(()=>{
        alert("error");
    })
  };

  return (
    <div>
      <center>
        <form onSubmit={id ? handleUpdate : handleDelete}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          About:
          <input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          Image url:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
          <button> {id ? "UPDATE" : "POST"}</button>
          <button onClick={handlePost}>Add</button>
          
        </form>

        <ul>
          {datas.map((i) => (
            <li key={i.id}>
              Name:{i.name}
              <br></br>About:{i.about}
              <br></br>Image:{i.imageUrl}
              <br></br>
              <img src={i.imageUrl}></img>
              <br></br>
              <button
                onClick={() => {
                  handleEdit(i);
                }}
              >
                Edit
              </button>
              <button onClick={()=>{handleDelete(i.id);}}>Delete</button>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
};

export default Gallery;
