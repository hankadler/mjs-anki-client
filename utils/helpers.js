export const querify = (query) => Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");

export const toBase64 = async (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (err) => reject(err);
});
