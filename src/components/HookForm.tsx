import { useForm, type SubmitHandler } from "react-hook-form";

type Gender = "male" | "female" | "other";

type FormData = {
    fullName: string;
    email: string;
    age: number;
    bio: string;
    agreedToTerms: boolean;
    gender: Gender;
    country: string;
};

export const HookForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            email: "",
            age: 0,
            bio: "",
            agreedToTerms: false,
            gender: "male",
            country: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Submitted data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto">
            <div>
                <label>Full Name</label>
                <input {...register("fullName", { required: "Name is required" })} />
                {errors.fullName && <p>{errors.fullName.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input type="email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Age</label>
                <input type="number" {...register("age", { valueAsNumber: true })} />
            </div>

            <div>
                <label>Bio</label>
                <textarea {...register("bio")} />
            </div>

            <div>
                <label>
                    <input type="checkbox" {...register("agreedToTerms")} />
                    I agree to the terms
                </label>
            </div>

            <div>
                <label>Gender</label>
                <select {...register("gender")}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label>Country</label>
                <input {...register("country")} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};
