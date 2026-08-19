import { showErrorToast } from '@/utils/toastHelpers';
import { useEffect } from 'react';

export const BlockedUserToast = () => {
  useEffect(() => {
    // Check if there's a blocked user flag in localStorage
    const showBlockedToast = localStorage.getItem('mixfood.showBlockedToast');
    
    if (showBlockedToast === 'true') {
      console.log('[BlockedUserToast] Found blocked user flag, showing toast');
      
      // Show toast with a small delay to ensure app is fully loaded
      setTimeout(() => {
        showErrorToast('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được trợ giúp.');
        // Clear the flag after showing toast
        localStorage.removeItem('mixfood.showBlockedToast');
      }, 500);
    }
  }, []);

  return null; // This component doesn't render anything
};