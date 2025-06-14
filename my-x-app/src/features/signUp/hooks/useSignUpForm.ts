// src/hooks/useSignUpForm.ts
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { validateSignUpForm, SignUpFormData, SignUpFormErrors } from '../validators/signUpValidator';
import { registerUser } from '../api/register'; // 👈 作成したAPI関数をインポート

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, email} = location.state || {};

  const [formData, setFormData] = useState<SignUpFormData>({
    userName: '',
    displayName:'',
    bio: '',
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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
      setErrors({ userName: 'ユーザーIDまたはメールアドレスが見つかりませんでした。' });
      return;
    }

    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const submissionData = new FormData();
      submissionData.append('id', id);
      submissionData.append('email', email);
      submissionData.append('userName', formData.userName);
      submissionData.append('displayName', formData.displayName);
      submissionData.append('bio', formData.bio);
      if (iconFile) {
        submissionData.append('iconFile', iconFile);
      }
        
      // ▼▼▼ APIロジックを専用関数に置き換え ▼▼▼
      const result = await registerUser(submissionData);

      console.log('Registration successful:', result.message);
      alert('アカウント作成成功！');
      // 成功したらページ遷移などの処理
      navigate('/home', { state: { user: result.user } });

    } catch (error: any) {
      console.error('Registration failed:', error);
      // registerUserからスローされたエラーをキャッチしてUIに表示
      setErrors({ userName: error.message || '不明なエラーが発生しました。' });
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