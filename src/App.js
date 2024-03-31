import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [bookmarks, setBookmarks] = useState();
  const [folder, setFolder] = useState();

  useEffect(() => {
    getAllBookmarks();
    fetch("http://localhost:5000/folder/getAll")
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
  }, []);

  const getAllBookmarks = () => {
    console.log("getting all");
    fetch("http://localhost:5000/bookmark/getAll")
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

  const folderClick = () => {
    setBookmarks([]);
  };

  return (
    <div className="App">
      <div className="drawer">
        <div onClick={getAllBookmarks}>All Bookmarks</div>
        {folder?.map((fol) => (
          <div key={fol.id} onClick={folderClick}>
            {fol.name}
          </div>
        ))}
      </div>

      <div className="content">
        <h2>Bookmarks:</h2>
        {bookmarks?.map((bookmark) => (
          <div className="bookmarkContainer" key={bookmark._id}>
            <img className="tabIcon" src={bookmark.tabIconUrl} alt="" />
            <div>
              <p>{bookmark.title}</p>
              <p>{bookmark.url}</p>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <p>{bookmark.note}</p>
                <p>{bookmark.folder}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
