import React from 'react';
import styles from './SignUpForm.module.css';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const TextAreaField: React.FC<Props> = ({ label, name, value, onChange }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <textarea
      className={styles.textarea}
      rows={3}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextAreaField;