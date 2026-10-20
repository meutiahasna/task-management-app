import './App.css'
import React, { useState, useEffect, useRef } from "react";

// 1. Tipe Data Tugas (TypeScript)
type Task = {
  id: number;
  judul: string;
  selesai: boolean;
};

// 2. Props Types untuk Komponen Anak
type TaskFormProps = {
  onTambahTask: (judul: string) => void;
};

type TaskSummaryProps = {
  total: number;
  selesai: number;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onHapus: (id: number) => void;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onHapus: (id: number) => void;
};

// Komponen 1: TaskForm (Form Input & Event Handling)
function TaskForm({ onTambahTask }: TaskFormProps) {
  const [judul, setJudul] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) return;

    onTambahTask(judul);
    setJudul("");
    inputRef.current?.focus(); // Hook useRef untuk auto-fokus
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Tambah tugas baru..."
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>Tambah</button>
    </form>
  );
}

// Komponen 2: TaskSummary (Statistik Tugas)
function TaskSummary({ total, selesai }: TaskSummaryProps) {
  return (
    <p>
      Total: <strong>{total}</strong> | Selesai: <strong>{selesai}</strong>
    </p>
  );
}

// Komponen 3: TaskItem (Komponen Satuan Baris Tugas)
function TaskItem({ task, onToggle, onHapus }: TaskItemProps) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span onClick={() => onToggle(task.id)} style={{ cursor: "pointer" }}>
        {task.selesai ? "✅" : "⏹️"} {task.judul}
      </span>
      <button onClick={() => onHapus(task.id)}>Hapus</button>
    </li>
  );
}

// Komponen 4: TaskList (List Rendering & Empty State)
function TaskList({ tasks, onToggle, onHapus }: TaskListProps) {
  // Conditional Rendering untuk Empty State
  if (tasks.length === 0) {
    return <p><em>Belum ada tugas. Nikmati waktu luangmu! 🎉</em></p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((item) => (
        <TaskItem
          key={item.id}
          task={item}
          onToggle={onToggle}
          onHapus={onHapus}
        />
      ))}
    </ul>
  );
}

// Komponen Utama: App (Composition, State, & Effects)
export default function App() {
  // State Utama Tasks (Membaca dari localStorage saat awal mount)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("PAW_TASKS");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, judul: "Jaringan Komputer: Kursus CNNA", selesai: false },
          { id: 2, judul: "Pengembangan Aplikasi Web: Pertemuan 7", selesai: true },
        ];
  });

  // useEffect untuk Sinkronisasi ke localStorage saat state 'tasks' berubah
  useEffect(() => {
    localStorage.setItem("PAW_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  // Handlers untuk Mengubah State
  const handleTambahTask = (judul: string) => {
    const newTask: Task = {
      id: Date.now(),
      judul,
      selesai: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
    );
  };

  const handleHapusTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const totalSelesai = tasks.filter((t) => t.selesai).length;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif"}}>
      <h1>Task Management App</h1>

      {/* Component Composition */}
      <TaskForm onTambahTask={handleTambahTask} />
      <TaskSummary total={tasks.length} selesai={totalSelesai} />
      <TaskList tasks={tasks} onToggle={handleToggleTask} onHapus={handleHapusTask} />
    </div>
  );
}
