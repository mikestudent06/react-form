import React, { useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  age: number;
  cars: string;
};
const CarsOptions = {
  VOLVO: "volvo",
  SAAB: "saab",
  MERCEDES: "mercedes",
  AUDI: "audi",
};

export const SimpleForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    age: 0,
    cars: CarsOptions.VOLVO,
  });
  console.log("formData", formData);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <div>
        <label htmlFor="cars" className="block font-medium">
          Choose a car:
        </label>

        <label htmlFor="cars" className="block font-medium">
          Choose a car:
        </label>
        <select
          name="cars"
          id="cars"
          value={formData.cars}
          onChange={handleChange}
        >
          <optgroup label="Swedish Cars">
            <option value={CarsOptions.VOLVO}>Volvo</option>
            <option value={CarsOptions.SAAB}>Saab</option>
          </optgroup>
          <optgroup label="German Cars">
            <option value={CarsOptions.MERCEDES}>Mercedes</option>
            <option value={CarsOptions.AUDI}>Audi</option>
          </optgroup>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};
