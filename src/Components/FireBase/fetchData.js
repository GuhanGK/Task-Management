import { getDatabase, ref, get, child } from "firebase/database";

const fetchTasksFromFirebase = async () => {
  try {
    const db = getDatabase(); // Initialize the database
    const dbRef = ref(db); // Get a reference to the database root
    const snapshot = await get(child(dbRef, "tasks")); // Fetch data from "tasks" node

    if (snapshot.exists()) {
      const data = snapshot.val(); // Retrieve data
      console.log("Fetched tasks:", data);

      // Convert data to an array if needed
      const tasksArray = Object.keys(data).map((key) => ({
        id: key, // Firebase unique key
        ...data[key], // Task details
      }));
      console.log("Tasks as array:", tasksArray);

      return tasksArray; // Return or set state with the fetched tasks
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};


export default fetchTasksFromFirebase;