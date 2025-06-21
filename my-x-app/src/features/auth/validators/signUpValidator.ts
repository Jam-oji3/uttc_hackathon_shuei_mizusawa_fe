// src/validators/authValidators.ts

// フォームの入力値の型
export interface SignUpFormData {
    username: string;
    displayName: string;
    bio: string;
  }
  
  // エラーメッセージの型
  export interface SignUpFormErrors {
    username?: string;
    displayName?: string;
    bio?: string;
  }
  
  export const validateSignUpForm = (data: SignUpFormData): SignUpFormErrors => {
    const errors: SignUpFormErrors = {};
  
    if (!data.username) {
      errors.username = 'ユーザー名は必須です。';
    } else if (!/^[a-zA-Z0-9_]{5,15}$/.test(data.username)) {
      errors.username = 'ユーザー名は5〜15文字の半角英数字とアンダースコア(_)のみ使用できます。';
    }
  
    if (!data.displayName) {
      errors.displayName = '表示名は必須です。';
    } else if (data.displayName.length > 50) {
      errors.displayName = '表示名は50文字以内で入力してください。';
    }
  
    if (data.bio.length > 200) {
      errors.bio = '自己紹介は200文字以内で入力してください。';
    }
  
    return errors;
  };