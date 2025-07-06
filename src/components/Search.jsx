import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import FileUpload from './Fileupload';
import FileCard from '../pages/FileCard';
import { useDispatch } from 'react-redux';
import { setFiles } from '../redux/fileSlice';
import { useSelector } from 'react-redux';

const Search = () => {
  const [tab, setTab] = useState('myFiles');
  const [query, setQuery] = useState('');
  const [allFiles, setAllFiles] = useState([]); // all data from API
  const dispatch = useDispatch();
  const files = useSelector(state => state.files);
    // 🔁 Fetch files when tab changes and apply existing query

  useEffect(() => {
    const fetchFiles = async () => {
      try {
            await showFiles();
        // Apply current query immediately after tab change
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };

    fetchFiles();
  }, [tab]); 

  async function showFiles() {
        const token = localStorage.getItem('token');
        const body = {
            tab,
            keyWord: query
        }

        const res = await axios.post('/search',body, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllFiles(res.data);
        dispatch(setFiles(res.data));
  }

  const handleUploadSuccess = async () => {
    await showFiles();
  };

  async function searchRecords (e) {
    await showFiles();
  }

  return (
    <div>
      <div className="search-container">
        <div className="search-upload-row">
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
            placeholder="Search by file name..."
          />
          <button onClick={searchRecords}>search</button>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </div>

      <div className="tab-buttons">
        <button className={tab === 'myFiles' ? 'active' : ''} onClick={() => setTab('myFiles')}>My Files</button>
        <button className={tab === 'myFeed' ? 'active' : ''} onClick={() => setTab('myFeed')}>My Feed</button>
      </div>

      <div className="file-results">
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded By</th>
                <th>Uploaded At</th>
                <th>Views</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileCard key={file._id} file={file} tab={tab} keyWord={query}/>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Search;
