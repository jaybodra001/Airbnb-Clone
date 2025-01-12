"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModalStore from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../Button";


const RegisterModal = () => {
  const registerModal = useRegisterModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then((res) => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyCount = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account"
      />
     <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        label="Continue With Google"
        onClick={() => {
         // signIn("google");
        }}
      />
      <Button
        outline
        icon={AiFillGithub}
        label="Continue With Github"
        onClick={() => {
         // signIn("github");
        }}
      />
      <div className="text-neutral-500 font-light mt-4">
        <div className="flex justify-center gap-2">
          <div>Already have an account?</div>
          <div  className="text-neutral-800 cursor-pointer hover:underline">
            Login
            {/* onClick={toggle} */}
          </div>
        </div>
      </div>
    </div>
  );

  return <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onsubmit)}
    body={bodyCount}
    footer={footerContent}
        />;
};

export default RegisterModal;
