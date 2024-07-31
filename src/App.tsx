import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { fetchKodam } from "./api/api";
import { themes } from "./style/themes";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const kodamResult = await fetchKodam();
      setResult(` ${name}! ${kodamResult}`);
      setLoading(false);
      setIsOpen(true);
    }, 2000);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="max-w-md w-full bg-base-200 p-8 rounded-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-base-content">
            Cek Kodam
          </h1>
          <select
            className="select select-bordered"
            value={theme}
            onChange={handleThemeChange}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">
                Masukkan Nama
              </span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full input-primary"
              placeholder="Nama"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Cek
          </button>
          {loading && (
            <div className="flex justify-center mt-4">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </form>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="inline-block align-middle bg-base-100 rounded-lg p-6 shadow-xl transform transition-all max-w-md w-full">
            <Dialog.Title className="text-xl font-bold text-base-content">
              Hasil Cek Kodam
            </Dialog.Title>
            <Dialog.Description className="mt-4 text-base-content">
              {result}
            </Dialog.Description>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary mt-6 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default App;
