import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadLogo } from "../api";

export default function LogoDropzone({ onUploaded }) {
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setError(null);
      try {
        const result = await uploadLogo(acceptedFiles[0]);
        if (onUploaded) onUploaded(result.url || result.logo_url || result.filename);
      } catch (e) {
        setError("Upload failed — the backend upload endpoint might not be ready yet. Paste a logo URL in the field above instead.");
      }
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"] },
    maxFiles: 1,
  });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {isDragActive ? "Drop the logo here..." : "Drag & drop a logo image, or click to browse"}
      </div>
      <p className="dropzoneHint">
        Backend not available? Just paste a logo URL in the text field above instead.
      </p>
      {error && <p className="dropzoneError">{error}</p>}
    </div>
  );
}
