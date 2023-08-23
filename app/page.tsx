"use client"; // This is a client component

import { useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';

export default function Home() {
   const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [outline, setOutline] = useState<null | string>(null); 
  const [isLoading, setLoading] = useState(false); // <-- Loading state here


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when request starts

    try {
      const response = await fetch('http://localhost:3001/generateOutline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, tag }),
    });

      const result = await response.json();
      setOutline(result.outline);
    } catch (error) {
      console.error(error);
      setOutline('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state when request ends
    }
  };

  const downloadWordDocument = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: outline?.split('\n').map(line => new Paragraph(line)) || [],
        },
      ],
    });

    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'outline.docx';
      link.click();
      URL.revokeObjectURL(url);
    });
  };
  return (
     <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      {isLoading && <div className="text-xl text-blue-600">Loading...</div>} {/* Loading indicator here */}

      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-md my-8">
        <h1 className="text-2xl mb-4">Generate Blog Post Outline</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded border" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 rounded border" required></textarea>
          <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" className="w-full p-2 rounded border" required />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Outline</button>
        </form>
       {outline && 
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <pre className="bg-gray-200 p-4 rounded overflow-auto">
            <code>{outline}</code>
          </pre>
          
          <button onClick={downloadWordDocument} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
            Download as Word Document
          </button>
        </div>
      }
      </div>

      { }
    </main>

  );
}
