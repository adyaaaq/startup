// Set data into localStorage
export const setData = (key, value) => {
    try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
};
// Get data from localStorage
export const getData = (key) => {
    try {
        const data = localStorage.getItem(key); // Get data from localStorage
        return data ? JSON.parse(data) : null; // Parse and return data, or return null if not found
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
};
// **Clear specific key from localStorage**
export const clearData = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error clearing data from localStorage:', error);
    }
};
