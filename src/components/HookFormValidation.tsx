import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Schéma Zod à jour
const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  age: z.coerce.number().min(1, "Âge invalide."),
  country: z.string().nonempty("Sélectionnez un pays."),
  gender: z.enum(["male", "female"], { message: "Choisissez un genre." }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions.",
  }),
  subscribe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const HookFormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      country: "",
      gender: undefined,
      terms: false,
      subscribe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Données valides :", data);
    alert("Formulaire soumis avec succès !");
    reset();
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Formulaire RHF + Zod (corrigé)</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom :</label>
          <input type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email :</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Âge :</label>
          <input type="number" {...register("age")} />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <div>
          <label>Pays :</label>
          <select {...register("country")}>
            <option value="">--Sélectionnez--</option>
            <option value="fr">France</option>
            <option value="cg">Congo</option>
            <option value="us">États-Unis</option>
          </select>
          {errors.country && (
            <p style={{ color: "red" }}>{errors.country.message}</p>
          )}
        </div>

        <div>
          <label>Genre :</label>
          <label>
            <input type="radio" value="male" {...register("gender")} /> Homme
          </label>
          <label>
            <input type="radio" value="female" {...register("gender")} /> Femme
          </label>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("terms")} /> J'accepte les
            conditions
          </label>
          {errors.terms && (
            <p style={{ color: "red" }}>{errors.terms.message}</p>
          )}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("subscribe")} /> S'abonner à la
            newsletter
          </label>
        </div>

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};
