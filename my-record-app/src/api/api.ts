// src/api/api.ts
const API_URL = import.meta.env.VITE_API_URL;

// src/api/api.ts
export const fetchRecords = async () => {
    try {
        const response = await fetch(`${API_URL}/api/record`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching records:", error);
        return []; // повертаємо порожній масив як резерв
    }
};

export const createRecord = async (record: { question: string; name: string; age: number; email: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/record`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(record),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error creating record:", error);
        return null; // повертаємо null як резерв
    }
};

