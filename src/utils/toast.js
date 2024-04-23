import { toast } from 'react-toastify';

export const showToastSuccess = (message, autoClose = 3000) => {
  toast.success(message, { autoClose });
};

export const showToastError = (message, autoClose = 3000) => {
  toast.error(message, { autoClose });
};

export const showToastWarning = (message, autoClose = 3000) => {
  toast.warning(message, { autoClose });
};

export const showToastInfo = (message, autoClose = 30000) => {
  toast.info(message, { autoClose });
};
