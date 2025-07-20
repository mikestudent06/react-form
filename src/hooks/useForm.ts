import { useState } from "react";

export function useForm<T>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;
    const checked = type === "checkbox" && "checked" in e.target ? e.target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit =
    (callback: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      callback(formData);
    };

  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData, // Optional, if needed manually
  };
}
