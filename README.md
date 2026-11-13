# 🏭 FactoryPulse

FactoryPulse is a React application for monitoring and managing industrial machines.

The application allows users to:

- View machine statistics on a dashboard.
- Display a list of machines.
- Search for a machine by name.
- Filter machines by status.
- Reset search and filters.
- Change a machine's status.
- Delete a machine.
- Add a new machine.
- Automatically update dashboard statistics.

---

## 📸 Project Overview

FactoryPulse is an industrial machine management dashboard built with React.

Each machine contains:

- ID
- Name
- Production zone
- Status
- Daily production quantity

The available machine statuses are:

- 🟢 En fonctionnement
- 🟠 À l'arrêt
- 🔴 En panne

---

## 🚀 Features

### 📊 Dashboard

The dashboard displays machine statistics:

- Total number of machines.
- Machines currently in operation.
- Machines that are broken.

The statistics are calculated automatically from the machine data.

---

### 🏭 Machine Management

The Machines page allows users to:

- Display all machines.
- View machine information.
- Search for machines by name.
- Filter machines by status.
- Reset search and filters.
- Change the status of a machine.
- Delete a machine.

---

### ➕ Add Machine

Users can add a new machine by providing:

- Machine name.
- Production zone.
- Machine status.
- Daily production quantity.

After adding a machine, the application redirects to the Machines page.

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript
- CSS
- React Router DOM
- JSON

---

## 📁 Project Structure

```text
FactoryPulse/
│
├── public/
│   ├── logo.svg
│   └── machines.json
│
├── src/
│   │
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   └── MachineCard.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Machines.jsx
│   │   ├── Machines.css
│   │   ├── AddMachine.jsx
│   │   └── AddMachine.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── README.md
```

---

## 📊 Machine Data

The application loads machine data from:

```text
public/machines.json
```

Example:

```json
{
  "id": 1,
  "name": "CNC Alpha",
  "zone": "Atelier A",
  "status": "En fonctionnement",
  "production": 250
}
```

---

## ⚛️ State Management

The main machine data is managed in `App.jsx` using React's `useState`.

```javascript
const [machines, setMachines] = useState([]);
```

The application loads the initial data using `useEffect` and `fetch()`.

```javascript
useEffect(() => {
  const loadMachines = async () => {
    try {
      const response = await fetch("/machines.json");

      if (!response.ok) {
        throw new Error("Impossible de charger les machines");
      }

      const data = await response.json();

      setMachines(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadMachines();
}, []);
```

---

## 🔄 Machine Status Update

A machine's status can be updated directly from its card.

The application uses `map()` to update the correct machine:

```javascript
const handleStatusChange = (id, newStatus) => {
  setMachines((previousMachines) =>
    previousMachines.map((machine) =>
      machine.id === id
        ? { ...machine, status: newStatus }
        : machine
    )
  );
};
```

---

## 🗑️ Delete Machine

Users can delete a machine.

A confirmation message is displayed before deletion.

```javascript
const handleDelete = (id) => {
  const confirmed = window.confirm(
    "Voulez-vous supprimer cette machine ?"
  );

  if (confirmed) {
    setMachines((previousMachines) =>
      previousMachines.filter(
        (machine) => machine.id !== id
      )
    );
  }
};
```

---

## ➕ Add Machine

A new machine is added to the React state.

```javascript
const handleAddMachine = (newMachine) => {
  setMachines((previousMachines) => {
    const newId =
      Math.max(
        0,
        ...previousMachines.map(
          (machine) => machine.id
        )
      ) + 1;

    return [
      ...previousMachines,
      {
        ...newMachine,
        id: newId
      }
    ];
  });
};
```

---

## 🔍 Search Machines

Users can search for a machine by its name.

The search is case-insensitive.

```javascript
const matchesName = machine.name
  .toLowerCase()
  .includes(search.toLowerCase());
```

---

## 🎯 Filter Machines

Machines can be filtered by their status:

- Tous les statuts
- En fonctionnement
- À l'arrêt
- En panne

The search and filter work together.

```javascript
const filteredMachines = machines.filter((machine) => {
  const matchesName = machine.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "Tous les statuts" ||
    machine.status === statusFilter;

  return matchesName && matchesStatus;
});
```

---

## 📊 Dashboard Statistics

The dashboard calculates statistics automatically.

### Total Machines

```javascript
const totalMachines = machines.length;
```

### Machines in Operation

```javascript
const runningMachines = machines.filter(
  (machine) =>
    machine.status === "En fonctionnement"
).length;
```

### Broken Machines

```javascript
const brokenMachines = machines.filter(
  (machine) =>
    machine.status === "En panne"
).length;
```

---

## 🧭 Application Routes

| Route           | Page        |
| --------------- | ----------- |
| `/`             | Dashboard   |
| `/machines`     | Machines    |
| `/machines/add` | Add Machine |

React Router DOM is used for navigation.

---

## 🎨 Design

The interface was designed using Figma.

The application includes:

- A dark sidebar.
- A reusable header.
- A dashboard with statistics cards.
- Machine cards displayed using CSS Grid.
- A search and filter toolbar.
- A machine creation form.

The main font used in the project is:

**Space Grotesk**

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/razaane/FactoryPulse.git
```

Go to the project directory:

```bash
cd FactoryPulse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed in your terminal.

Usually:

```text
http://localhost:5173
```

---

## 📦 Dependencies

The main dependency used for navigation is:

```bash
npm install react-router-dom
```

---

## ⚠️ Current Limitation

Currently, the application uses a local JSON file for the initial data.

Machine changes are stored only in React state.

This means:

- Added machines disappear after a page refresh.
- Deleted machines return after a page refresh.
- Status changes are reset after a page refresh.

A backend and database would be required to permanently store the changes.

---

## 👩‍💻 Author

**Razane Wakhidi**

Full Stack Developer
