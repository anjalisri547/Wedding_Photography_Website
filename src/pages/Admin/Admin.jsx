import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { 
  fetchCollection, 
  addDocToCollection, 
  updateDocInCollection, 
  deleteDocFromCollection,
  addPackage
} from "../../services/firestoreCrud";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../ClientLogin/firebaseConfig"; 
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadItems();
  }, [activeTab]);

  const loadItems = async () => {
    const collectionName = 
      activeTab === "portfolio" ? "portfolioSections" : activeTab === "booking" ? "bookings" : activeTab;
    const data = await fetchCollection(collectionName);
    setItems(data);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    return fileURL;
  };

  // ------------------- ADD ITEM -------------------
  const handleAdd = async () => {
    const collectionName = activeTab === "portfolio" ? "portfolioSections" : activeTab;

    // Booking tab
    if (activeTab === "booking") {
      if (!newItem.name || !newItem.email || !newItem.phone || !newItem.date || !newItem.package) {
        alert("Please fill all required booking fields!");
        return;
      }
      const bookingData = {
        name: newItem.name,
        email: newItem.email,
        phone: newItem.phone,
        date: newItem.date,
        package: newItem.package,
        message: newItem.message || "",
        status: newItem.status || "Pending",
        createdAt: new Date()
      };
      await addDocToCollection("bookings", bookingData);
    } 
    // Packages
    else if (activeTab === "packages") {
      await addPackage(newItem, file);
    } 
    // Testimonials
    else if (activeTab === "testimonials") {
      let testimonialData = {
        name: newItem.name || "",
        role: newItem.role || "",
        title: newItem.title || "",
        text: newItem.text || "",
        url: ""
      };
      if (file) testimonialData.url = await uploadFile(file, "testimonials");
      else if (newItem.image) testimonialData.url = newItem.image;
      await addDocToCollection("testimonials", testimonialData);
    } 
    // Portfolio
    else if (activeTab === "portfolio") {
      let portfolioData = {
        title: newItem.title || "",
        subtitle: newItem.subtitle || "",
        images: []
      };
      if (file) {
        const url = await uploadFile(file, "portfolio");
        portfolioData.images.push(url);
      }
      if (newItem.image) portfolioData.images.push(newItem.image);
      await addDocToCollection("portfolioSections", portfolioData);
    } 
    // Other tabs
    else {
      let itemToSave = { ...newItem };
      if (file) itemToSave.url = await uploadFile(file, activeTab);
      await addDocToCollection(collectionName, itemToSave);
    }

    setNewItem({});
    setFile(null);
    loadItems();
  };

  // ------------------- EDIT ITEM -------------------
  const handleEdit = async (item) => {
    let updatedData = { ...item };
    const collectionName = activeTab === "portfolio" ? "portfolioSections" : activeTab;

    // Booking tab
    if (activeTab === "booking") {
      const updatedName = prompt("Enter Name", item.name);
      const updatedEmail = prompt("Enter Email", item.email);
      const updatedPhone = prompt("Enter Phone", item.phone);
      const updatedDate = prompt("Enter Date", item.date);
      const updatedPackage = prompt("Enter Package", item.package);
      const updatedMessage = prompt("Enter Message", item.message);
      const updatedStatus = prompt("Enter Status (Pending/Confirmed/Completed/Cancelled)", item.status);

      updatedData = {
        name: updatedName || item.name,
        email: updatedEmail || item.email,
        phone: updatedPhone || item.phone,
        date: updatedDate || item.date,
        package: updatedPackage || item.package,
        message: updatedMessage || item.message,
        status: updatedStatus || item.status
      };

      await updateDocInCollection("bookings", item.id, updatedData);
      loadItems();
      return;
    }

    // Packages
    else if (activeTab === "packages") {
      const updatedTitle = prompt("Enter new title", item.title);
      const updatedPrice = prompt("Enter price", item.price);
      const updatedDescription = prompt("Enter description", item.description);
      const updatedFeatures = prompt("Enter features (comma separated)", item.features?.join(","));

      updatedData = {
        title: updatedTitle || item.title,
        price: updatedPrice || item.price,
        description: updatedDescription || item.description,
        features: updatedFeatures ? updatedFeatures.split(",").map(f => f.trim()) : item.features
      };
    } 
    // Testimonials
    else if (activeTab === "testimonials") {
      const updatedName = prompt("Enter Name", item.name);
      const updatedRole = prompt("Enter Role", item.role);
      const updatedTitle = prompt("Enter Title", item.title);
      const updatedText = prompt("Enter Text", item.text);
      const updatedImage = prompt("Enter Image URL (optional)", item.url || "");

      updatedData = {
        name: updatedName || item.name,
        role: updatedRole || item.role,
        title: updatedTitle || item.title,
        text: updatedText || item.text,
        url: updatedImage || item.url || ""
      };

      if (file) updatedData.url = await uploadFile(file, "testimonials");
    } 
    // Portfolio
    else if (activeTab === "portfolio") {
      const updatedTitle = prompt("Enter Section Title", item.title);
      const updatedSubtitle = prompt("Enter Section Subtitle", item.subtitle);
      updatedData = {
        ...updatedData,
        title: updatedTitle || item.title,
        subtitle: updatedSubtitle || item.subtitle,
        images: item.images || []
      };
      if (file) {
        const url = await uploadFile(file, "portfolio");
        updatedData.images.push(url);
      }
    } 
    else {
      const updatedTitle = prompt("Enter new title", item.title);
      updatedData.title = updatedTitle || item.title;

      if (file) updatedData.url = await uploadFile(file, activeTab);
    }

    setFile(null);
    await updateDocInCollection(collectionName, item.id, updatedData);
    loadItems();
  };

  // ------------------- DELETE ITEM -------------------
  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure?")) return;

    // Booking tab
    if (activeTab === "booking") {
      await deleteDocFromCollection("bookings", item.id);
      loadItems();
      return;
    }

    // Delete file if exists
    if (item.url) {
      const fileRef = ref(storage, item.url);
      await deleteObject(fileRef).catch(() => {});
    }
    const collectionName = activeTab === "portfolio" ? "portfolioSections" : activeTab;
    await deleteDocFromCollection(collectionName, item.id);
    loadItems();
  };

  return (
    <>
    <Helmet>
  <title>Admin Dashboard | AnMan Captures</title>
  <meta 
    name="description" 
    content="Manage client data, photos, and videos securely from Your Studio Name admin dashboard." 
  />
</Helmet>
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="tabs">
        {["packages","testimonials","blog","booking","contact","videos","clients","portfolio"].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={activeTab === tab ? "active" : ""}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h2>{activeTab.toUpperCase()}</h2>

        {/* Add new booking */}
        {activeTab === "booking" && (
          <div className="add-item">
            <input 
              type="text"
              placeholder="Name"
              value={newItem.name || ""}
              onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            />
            <input 
              type="email"
              placeholder="Email"
              value={newItem.email || ""}
              onChange={e => setNewItem(prev => ({ ...prev, email: e.target.value }))}
            />
            <input 
              type="tel"
              placeholder="Phone"
              value={newItem.phone || ""}
              onChange={e => setNewItem(prev => ({ ...prev, phone: e.target.value }))}
            />
            <input 
              type="date"
              value={newItem.date || ""}
              onChange={e => setNewItem(prev => ({ ...prev, date: e.target.value }))}
            />
            <select 
              value={newItem.package || ""} 
              onChange={e => setNewItem(prev => ({ ...prev, package: e.target.value }))}
            >
              <option value="">Select Package</option>
              <option value="intimate">The Intimate Vows</option>
              <option value="grand">The Grand Celebration</option>
              <option value="royal">The Royal Affair</option>
            </select>
            <textarea 
              placeholder="Message"
              value={newItem.message || ""}
              onChange={e => setNewItem(prev => ({ ...prev, message: e.target.value }))}
            />
            <select 
              value={newItem.status || "Pending"} 
              onChange={e => setNewItem(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={handleAdd}>Add Booking</button>
          </div>
        )}

        {/* Items Table */}
        <table>
          <thead>
            <tr>
              <th>Name / Title</th>
              {activeTab === "booking" && (
                <>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Package</th>
                  <th>Message</th>
                  <th>Status</th>
                </>
              )}
              {activeTab === "packages" && <th>Price</th>}
              {activeTab === "testimonials" && <th>Role</th>}
              {["blog","packages","testimonials"].includes(activeTab) && <th>Content / Description</th>}
              {["gallery","videos","testimonials","portfolio"].includes(activeTab) && <th>Preview</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name || item.title}</td>
                {activeTab === "booking" && (
                  <>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.date}</td>
                    <td>{item.package}</td>
                    <td>{item.message}</td>
                    <td>{item.status}</td>
                  </>
                )}
                {activeTab === "packages" && <td>{item.price}</td>}
                {activeTab === "testimonials" && <td>{item.role}</td>}
                {["blog","packages","testimonials"].includes(activeTab) && <td>{item.content || item.description || item.text}</td>}
                {["gallery","videos","testimonials","portfolio"].includes(activeTab) && (
                  <td>
                    {activeTab === "videos" && item.url && <video src={item.url} width={120} controls />}
                    {activeTab !== "videos" && item.url && <img src={item.url || item.images?.[0]} alt={item.title || item.name} width={80} />}
                  </td>
                )}
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
    </>
  );
};

export default Admin;

