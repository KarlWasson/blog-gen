import React, { useState } from 'react';
import fetchOutline from './api/fetchOutline';
import downloadDocx from './utils/downloadDocx';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: ''
  });
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);
  const textarea = document.createElement("textarea");
  textarea.textContent = outline;
  textarea.style.position = "fixed";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCopyClick = () => {
    
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        alert('Outline copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy', err);
    }

    document.body.removeChild(textarea);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const result = await fetchOutline(formData);
        setOutline(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        setOutline('An error occurred while generating the outline.');
    } finally {
        setLoading(false);
    }
  };

  const handleDocxDownload = () => {
    downloadDocx(outline);
    console.log("Downloading DOCX...");
  };

  return (
    <div className="app-container">
      {loading && <p>Loading...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="mb-4" />
                </div>
                <div className="mb-4">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="mb-4"></textarea>
                </div>
                <div className="mb-4">
                    <label>Tag:</label>
                    <input type="text" name="tag" value={formData.tag} onChange={handleChange} className="mb-4" />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="btn-submit mb-4" disabled={loading}>Submit</button>
                    <button type="button" onClick={handleDocxDownload} className="btn-submit mb-4">Download DOCX</button>
                </div>
            </form>

      {outline && (
        <div className="bg-black rounded-md mb-4">
            <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                <span>Outline</span>
                <button 
                    onClick={handleCopyClick} 
                    aria-label="Copy outline to clipboard"
                    className="flex ml-auto gap-2 btn-copy"
                >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    Copy text
                </button>
            </div>
            <div className="p-4 overflow-y-auto">
                <code className="whitespace-pre">
                    {outline}
                </code>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
