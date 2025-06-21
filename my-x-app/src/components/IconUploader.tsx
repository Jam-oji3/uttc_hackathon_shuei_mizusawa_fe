import React from 'react';
import styles from './IconUploader.module.css';

type Props = {
  label: string;
  preview: string | null;
  onChange: (file: File, preview: string) => void;
};

const IconUploader: React.FC<Props> = ({ label, preview, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange(file, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      {preview && <img src={preview} alt="icon preview" className={styles.iconPreview} />}
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};

export default IconUploader;