// src/hooks/useSignUpForm.ts
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStorageUpload } from '../../../hooks/useStorageUpload';
import { validateSignUpForm, SignUpFormData, SignUpFormErrors } from '../validators/signUpValidator';
import { registerUser } from '../../user/api/users';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, email} = location.state || {};

  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    displayName:'',
    bio: '',
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { uploadFile, isLoading: isUploading, error: uploadError } = useStorageUpload(); 
  const { idToken, isLoading: isAuthLoading } = useAuthContext(); // 👈 認証情報を取得

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (file: File, preview: string) => {
    setIconFile(file);
    setIconPreview(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    if (!id || !email) {
      setErrors({ username: 'ユーザーIDまたはメールアドレスが見つかりませんでした。' });
      return;
    }

    if (!idToken || isAuthLoading) {
      setErrors({ username: '認証情報が取得できません。' });
      return;
    }
  
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setIsLoading(true);
  
    try {
      let iconUrl = "";
      if (iconFile) {
        iconUrl = await uploadFile(iconFile);
      }
  
      // FormData の代わりに JSON オブジェクトとして送信
      const submissionData = {
        id,
        email,
        username: formData.username,
        displayName: formData.displayName,
        bio: formData.bio,
        iconUrl,
      };
  
      const result = await registerUser(idToken, submissionData); // 👈 JSONで送信

      console.log('Registration successful:', result.message);
      alert('アカウント作成成功！');
      navigate('/home', { state: { user: result.user } });
  
    } catch (error: any) {
      console.error('Registration failed:', error);
      setErrors({ username: error.message || '不明なエラーが発生しました。' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    iconPreview,
    errors,
    isLoading,
    handleInputChange,
    handleIconChange,
    handleSubmit,
  };
};