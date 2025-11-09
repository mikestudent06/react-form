import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  age: number | "";
  country: string;
  gender: "male" | "female" | "";
  terms: boolean;
  subscribe: boolean;
};

export const FormValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    country: "",
    gender: "",
    terms: false,
    subscribe: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  console.log("formData", formData);
  console.log("errors", errors);
  // Fonction de validation manuelle
  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis.";
    if (!formData.email.includes("@")) newErrors.email = "Email invalide.";
    if (!formData.age || formData.age <= 0) newErrors.age = "Âge invalide.";
    if (!formData.country) newErrors.country = "Sélectionnez un pays.";
    if (!formData.gender) newErrors.gender = "Choisissez un genre.";
    if (!formData.terms)
      newErrors.terms = "Vous devez accepter les conditions.";

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form data valid:", formData);
      alert("Formulaire soumis avec succès !");
      // reset
      setFormData({
        name: "",
        email: "",
        age: "",
        country: "",
        gender: "",
        terms: false,
        subscribe: false,
      });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit}>
        {/* Nom */}
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* Âge */}
        <div>
          <label htmlFor="age">Âge :</label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>

        {/* Pays */}
        <div>
          <label htmlFor="country">Pays :</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">--Sélectionnez--</option>
            <option value="fr">France</option>
            <option value="cg">Congo</option>
            <option value="us">États-Unis</option>
          </select>
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="gender">Genre :</label>
          <div>
            <label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Homme
            </label>
            <label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Femme
            </label>
          </div>
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </div>

        {/* Conditions */}
        <div>
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            J'accepte les conditions
          </label>
          {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
        </div>

        {/* Switch (abonnement) */}
        <div>
          <label htmlFor="subscribe">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            S'abonner à la newsletter
          </label>
        </div>

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};
