import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [message, setMessage] = useState('');
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: '', email: '', phone: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchContacts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact` , {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setContacts(data);
                } else {
                    setMessage(data.message || "Failed to load contacts");
                }
            } catch (error) {
                setMessage("Error fetching contacts");
                console.error(error);
            }
        };

        fetchContacts();
    }, [navigate, token]);

    const handleInputChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        setMessage("Adding contact...");

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact` , {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });

            const data = await response.json();

            if (response.ok) {
                setContacts([...contacts, data]);
                setNewContact({ name: '', email: '', phone: '' });
                setMessage('');
            } else {
                setMessage(data.message || "Failed to add contact");
            }
        } catch (error) {
            setMessage("Error adding contact");
            console.error(error);
        }
    };

    const handleEdit = (contact) => {
        setEditingId(contact._id);
        setEditData({ name: contact.name, email: contact.email, phone: contact.phone });
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            const data = await response.json();

            if (response.ok) {
                const updatedContacts = contacts.map(contact =>
                    contact._id === id ? data : contact
                );
                setContacts(updatedContacts);
                setEditingId(null);
                setEditData({ name: '', email: '', phone: '' });
            } else {
                setMessage(data.message || "Failed to update contact.");
            }
        } catch (error) {
            console.error("Error updating contact:", error);
            setMessage("Something went wrong while updating.");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedContacts = contacts.filter(contact => contact._id !== id);
                setContacts(updatedContacts);
            } else {
                const data = await response.json();
                setMessage(data.message || "Failed to delete contact.");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            setMessage("Something went wrong during deletion.");
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="form-title">Dashboard</h1>

            {message && <div className={`message ${message.includes("Error") || message.includes("Failed") ? 'error' : 'success'}`}>{message}</div>}

            <form className="dashboard-form" onSubmit={handleAddContact}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <button type="submit" className="btn-submit">Add</button>
            </form>

            <h2>Your Contacts</h2>
            {contacts.length === 0 ? (
                <p>No contacts yet.</p>
            ) : (
                <ul className="contact-list">
                    {contacts.map(contact => (
                        <li key={contact._id} className="contact-item">
                            {editingId === contact._id ? (
                                <div className="contact-edit-fields">
                                    <input name="name" value={editData.name} onChange={handleEditChange} className="form-input" />
                                    <input name="email" value={editData.email} onChange={handleEditChange} className="form-input" />
                                    <input name="phone" value={editData.phone} onChange={handleEditChange} className="form-input" />
                                </div>
                            ) : (
                                <div className="contact-details">
                                    <strong>{contact.name}</strong><br />
                                    <span>{contact.email}</span><br />
                                    <span>{contact.phone}</span>
                                </div>
                            )}

                            <div className="contact-buttons">
                                {editingId === contact._id ? (
                                    <>
                                        <button className="btn-submit" onClick={() => handleSave(contact._id)}>Save</button>
                                        <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-submit" onClick={() => handleEdit(contact)}>Edit</button>
                                        <button className="btn-secondary" onClick={() => handleDelete(contact._id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;


