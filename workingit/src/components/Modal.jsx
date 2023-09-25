import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ProgressBar from 'react-progressbar';
import {token} from '../services/apirest.js';


const CreateProjectModal = ({ isOpen, onRequestClose }) => {
  const [form, setForm] = useState({ name: '', description: '', type: '', mt2: '', photos: null });
  const [projectTypes, setProjectTypes] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await axios.get('http://149.50.130.111:8002/api/project-types/');
        setProjectTypes(response.data);
      } catch (error) {
        console.error("Error fetching project types", error);
      }
    };
    fetchProjectTypes();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prevForm => ({ ...prevForm, photos: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    try {
      setProgress(50); // Set progress to 50% when the request starts
      await axios.post('http://149.50.130.111:8002/api/projects/', formData,
        {headers:{
            Authorization:`Bearer ${token}`
        }}
      )
      setProgress(100); // Set progress to 100% when the request is successful
      onRequestClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating project", error);
      setProgress(0); // Reset progress on error
    }
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Create New Project</h2>
      <ProgressBar completed={progress} />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Type:
          <select name="type" value={form.type} onChange={handleChange} required>
            {projectTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </label>
        <label>
          mt2:
          <input type="text" name="mt2" step="0.01" value={form.mt2} onChange={handleChange} required />
        </label>
        <label>
          Photo:
          <input type="file" name="photos" onChange={handleFileChange} />
        </label>
        <button type="submit">Create Project</button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;