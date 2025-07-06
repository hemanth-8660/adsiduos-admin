const FilePreview = ({src, type}) => {
    if (type?.endsWith('image')) return <img src={src} width={200} alt="preview"/>
    if (type?.endsWith('video')) return <video src={src} width={250} controls/>
    if (type?.endsWith('audio')) return <audio src={src} controls/>
    if (type?.endsWith('pdf')) return <iframe src={src} width="100%" height="400px" title="pdf-preview" />;
    return <p>preview not supported</p>;
}

export default FilePreview;