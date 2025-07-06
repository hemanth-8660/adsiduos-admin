import React from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setFiles} from '../redux/fileSlice';

const FileCard = ({file, tab, keyWord}) => {
    const dispatch = useDispatch();
    async function handleView() {
        // update view count
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`/files/${file._id}/view`, {},{headers: {Authorization: `Bearer ${token}`}});
             const viewableURL = file.secure_url.replace('/upload/', '/upload/fl_attachment:false/');
            window.open(viewableURL,'_blank');
             const body = {
                tab,
                keyWord
            }
            const res = await axios.post('/search',body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setFiles(res.data));
        } catch (err) {
            alert('error in increasing view vcount')
        }
    }
    return (
            <tr>
                <td>{file.originalFileName}</td>
                <td>{file.uploadedBy}</td>
                <td>{new Date(file.updatedAt).toLocaleString()}</td>
                <td>{file.views || 0}</td>
                <td><button onClick={handleView}>view</button></td>
            </tr>
        
    )
}

export default FileCard