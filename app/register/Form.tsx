"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

type Inputs = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

const Form = () => {
    const router = useRouter();
    const session = useSession();

    if (session.status === "authenticated") {
        router?.push("/");
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
        },
    });

    const [message, setMessage] = useState<null | string>(null);

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { firstName, lastName, email, password } = form;
        console.log('wee')
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });
            res.status === 201 &&
                router.push("/login?success=Account has been created");
        } catch (err: any) {
            setMessage(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(formSubmit)}
            autoComplete="off"
            className={`-mt-2 flex justify-center items-center flex-col`}
        >
            <fieldset className="w-full mx-4 flex justify-center items-center flex-col">
                <div className="w-full px-2">
                    <label
                        htmlFor="firstName"
                        className="text-sm"
                    >
                        First Name
                    </label>
                    <input
                        {...register("firstName", {
                            required: "First Name is required",
                        })}
                        type="text"
                        autoComplete="false"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.firstName?.message && (
                        <small className="block text-red-600">
                            {errors.firstName.message}
                        </small>
                    )}
                </div>
                <div className="w-full px-2">
                    <label
                        htmlFor="lastName"
                        className="text-sm"
                    >
                        Last Name
                    </label>
                    <input
                        {...register("lastName", {
                            required: "First Name is required",
                        })}
                        type="text"
                        autoComplete="false"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.lastName?.message && (
                        <small className="block text-red-600">
                            {errors.lastName.message}
                        </small>
                    )}
                </div>
                <div className="w-full px-2">
                    <label
                        htmlFor="email"
                        className="text-sm"
                    >
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        })}
                        type="email"
                        autoComplete="off"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.email?.message && (
                        <small className="block text-red-600">{errors.email.message}</small>
                    )}
                </div>

                <div className="w-full px-2">
                    <label
                        htmlFor="password"
                        className="text-sm"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                        })}
                        autoComplete="new-password"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.password?.message && (
                        <small className="block text-red-600">
                            {errors.password.message}
                        </small>
                    )}
                </div>
            </fieldset>
            <div className="flex flex-col w-full items-center px-2">
                <p className="w-full text-left">
                    <Link
                        href="/login"
                        className="text-lightColor hover:text-primaryColor hover:underline"
                    >
                        {" "}
                        Login with an existing account
                    </Link>
                </p>
                {message && <small className="block text-red-600">{message}</small>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-center my-12 flex-1 w-full bg-green-700 hover:bg-white hover:text-green-700 hover:border-green-700 hover:border-[1px] hover:font-semibold rounded-md p-[1rem] px-4 mx-2  text-white cursor-pointer"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default Form;