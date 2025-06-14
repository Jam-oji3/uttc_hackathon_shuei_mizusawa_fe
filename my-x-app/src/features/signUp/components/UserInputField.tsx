import React from 'react';
import styles from './SignUpForm.module.css';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

const UserInputField: React.FC<Props> = ({ label, name, value, onChange, required }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>
      {label}
      {required && <span className={styles.required}> *</span>}
    </label>
    <input
      type="text"
      className={styles.input}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default UserInputField;