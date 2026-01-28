// Hàm lấy dữ liệu từ LocalStorage
export const loadData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

// Hàm lưu dữ liệu vào LocalStorage
export const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};