import React, { useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  age: number;
};

export const SimpleForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    age: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Age</label>
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};
