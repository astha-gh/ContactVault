import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchContacts();
    }, [navigate, token]);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) setContacts(data);
            else setMessage(data.message || "Failed to load contacts");
        } catch (error) {
            setMessage("Error fetching contacts");
            console.error(error);
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("Adding contact...");

        const { name, email, phone } = newContact;

        // Basic validation
        if (!name || !email || !phone) {
            setMessage("All fields are required!");
            setIsLoading(false);
            return;
        }

        try {
            const contactResponse = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone
                })
            });

            if (!contactResponse.ok) {
                const errorData = await contactResponse.json();
                throw new Error(errorData.message || "Failed to create contact");
            }

            // Success!
            const newContactData = await contactResponse.json();
            setContacts([...contacts, newContactData]);
            setNewContact({ name: '', email: '', phone: '' });
            setMessage("Contact added successfully!");

        } catch (error) {
            setMessage(error.message || "Failed to add contact");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (contact) => {
        setEditingId(contact._id);
        setEditData({ name: contact.name, email: contact.email, phone: contact.phone });
    };

    const handleSave = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            if (response.ok) {
                const updatedContact = await response.json();
                setContacts(contacts.map(c => c._id === id ? updatedContact : c));
                setEditingId(null);
                setMessage("Contact updated successfully");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/contact/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setContacts(contacts.filter(c => c._id !== id));
                setMessage("Contact deleted successfully");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="form-title">Dashboard</h1>

            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
            />

            {message && <div className={`message ${message.includes("Error") ? 'error' : 'success'}`}>{message}</div>}

            <form className="dashboard-form" onSubmit={handleAddContact}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="form-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="form-input"
                    required
                />
                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Contact'}
                </button>
            </form>

            <h2>Your Contacts</h2>
            {contacts.length === 0 ? (
                <p>No contacts yet.</p>
            ) : (
                <ul className="contact-list">
                    {contacts
                        .filter(contact =>
                            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(contact => (
                            <li key={contact._id} className="contact-item">
                                {editingId === contact._id ? (
                                    <>
                                        <div className="contact-edit-fields">
                                            <input
                                                name="name"
                                                value={editData.name}
                                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                className="form-input"
                                            />
                                            <input
                                                name="email"
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                className="form-input"
                                            />
                                            <input
                                                name="phone"
                                                value={editData.phone}
                                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="contact-buttons">
                                            <button
                                                className="btn-submit"
                                                onClick={() => handleSave(contact._id)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Saving...' : 'Save'}
                                            </button>
                                            <button className="btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="contact-details">
                                            <strong>{contact.name}</strong><br />
                                            <span>{contact.email}</span><br />
                                            <span>{contact.phone}</span>
                                        </div>
                                        <div className="contact-buttons">
                                            <button className="btn-submit" onClick={() => handleEdit(contact)}>Edit</button>
                                            <button
                                                className="btn-secondary"
                                                onClick={() => handleDelete(contact._id)}
                                                disabled={isLoading}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;