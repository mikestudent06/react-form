import { useForm } from "../hooks/useForm";

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

export const FormWithHook = () => {
    const {
        formData,
        handleChange,
        handleSubmit
    } = useForm<FormData>({
        fullName: "",
        email: "",
        age: 0,
        bio: "",
        agreedToTerms: false,
        gender: "male",
        country: "",
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted with data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto">
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
            </div>        </form>
    );
};
