export const toMultipartFormData = (data, files = {}) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, String(item)));
    } else {
      formData.append(key, String(value));
    }
  });

  Object.entries(files).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((file) => formData.append(key, file));
    } else if (value) {
      formData.append(key, value);
    }
  });

  return formData;
};