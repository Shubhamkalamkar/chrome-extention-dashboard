import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";

function App() {
  const [bookmarks, setBookmarks] = useState();
  const [folder, setFolder] = useState();
  const [headerName, setHeaderName] = useState("All Bookmarks");
  const [login, setLogin] = useState(true);
  const [getfolder, setGetFolder] = useState(true);

  useEffect(() => {
    let uid = localStorage.getItem("email");
    if (uid) {
      setLogin(false);
    }
    getAllBookmarks();
    // fetch("https://chrome-extention-backend.onrender.com/folder/getAll")
    fetch("http://localhost:5000/folder/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All folder:", data);
        setFolder(data);
      })
      .catch((error) => {
        console.error("Error fetching folder:", error);
      });
  }, [getfolder]);

  const getAllBookmarks = () => {
    console.log("getting all");
    setHeaderName("All Bookmarks");
    // fetch("https://chrome-extention-backend.onrender.com/bookmark/getAll")
    fetch("http://localhost:5000/bookmark/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All bookmarks:", data);
        setBookmarks(data);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  };

  const folderClick = (name) => {
    console.log("folder", name);
    fetch(`http://localhost:5000/bookmark/getbyfolder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        folder: name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All bookmarks:", data);
        setBookmarks(data);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  };

  const addNewCollection = () => {
    const collectionName = prompt("Enter collection name:");
    if (collectionName) {
      console.log("Collection name:", collectionName);

      fetch("http://localhost:5000/folder/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: collectionName,
          email: localStorage.getItem("email"),
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add collection");
          }
          console.log("Collection added successfully");
          alert("success");
          setGetFolder(!getfolder);
        })
        .catch((error) => {
          console.error("Error adding collection:", error);
          alert("error");
        });
    } else {
      console.log("User cancelled the prompt.");
    }
  };

  return (
    <div>
      {login ? (
        <Login />
      ) : (
        <div className="App">
          <div className="drawer">
            <div className="allBookmarkTab" onClick={getAllBookmarks}>
              All Bookmarks
            </div>
            <div style={{ padding: "20px",background:"bisque", borderRadius:"20px",margin:"10px", cursor:"pointer"}} onClick={addNewCollection}>
              Add new Collections
            </div>

            {folder?.map((fol) => (
              <div key={fol._id} onClick={() => folderClick(fol.name)}>
                <div
                  onClick={() => setHeaderName(fol.name)}
                  style={{ padding: "20px", cursor: "pointer" }}
                >
                  {fol.name}
                </div>
              </div>
            ))}
          </div>

          <div className="content">
            <h2 style={{ padding: "10px", marginLeft: "20px" }}>
              {headerName}
            </h2>
            {bookmarks?.map((bookmark) => (
              <div className="bookmarkContainer" key={bookmark._id}>
                <img className="tabIcon" src={bookmark.tabIconUrl} alt="" />
                <div>
                  <p>{bookmark.title}</p>
                  {/* <p>{bookmark.url}</p> */}
                  <a href={bookmark.url}>{bookmark.url}</a>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <p className="tabs">{bookmark.note} </p>
                    <p className="tabs">{bookmark.folder}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
