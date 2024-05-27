import React, { useState } from "react";
import "./App.css";
import "./Popup.css";

function App() {
  const [collections, setCollections] = useState([]);
  const [showNewCollectionPopup, setShowNewCollectionPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");

  const handleNewCollection = () => {
    setShowNewCollectionPopup(true);
  };

  const handleDelete = (index) => {
    setCollectionToDelete(index);
    setShowDeletePopup(true);
  };

  const handleSubmitNewCollection = () => {
    if (newCollectionName.trim() && newCollectionDescription.trim()) {
      setCollections([
        ...collections,
        { name: newCollectionName, description: newCollectionDescription },
      ]);
      setNewCollectionName("");
      setNewCollectionDescription("");
      setShowNewCollectionPopup(false);
    }
  };

  const handleConfirmDelete = () => {
    setCollections(
      collections.filter((cur, index) => index !== collectionToDelete)
    );
    setCollectionToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Collections</h1>
        <p>
          Introducing collections: the ability to organise your materials, your
          way.
        </p>
      </header>
      <aside className="sidebar">
        <button className="new-collection-btn" onClick={handleNewCollection}>
          + New Collection
        </button>
      </aside>
      <main>
        <div className="collections">
          {collections.map((collection, index) => (
            <div className="collection-card" key={index}>
              <button className="download-btn">Download data</button>
              <div className="collection-content">
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
              </div>
              <div className="collection-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div
            className="collection-card new-collection-card"
            onClick={handleNewCollection}
          >
            <div className="plus-icon">+</div>
          </div>
        </div>
      </main>
      {showNewCollectionPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>New Collection</h2>
            <label>
              Collection Name
              <input
                type="text"
                placeholder="Collection Title"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                maxLength="40"
              />
            </label>
            <label>
              Description
              <textarea
                placeholder="Collection Description"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                maxLength="140"
              ></textarea>
            </label>
            <div className="popup-actions">
              <button onClick={() => setShowNewCollectionPopup(false)}>
                Close
              </button>
              <button
                className={
                  newCollectionName && newCollectionDescription ? "active" : ""
                }
                onClick={handleSubmitNewCollection}
                disabled={!newCollectionName || !newCollectionDescription}
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Delete Collection</h2>
            <p>Are you sure you want to delete this collection?</p>
            <div className="popup-actions">
              <button onClick={handleConfirmDelete}>Delete</button>
              <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
