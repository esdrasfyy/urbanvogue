"use client";
const profileDefault =
  "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputUi } from "@/components/ui/inputs/default";
import { UpdateUserApi } from "@/services/user/update";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateUi } from "@/components/ui/inputs/date";
import { ContextUser } from "@/contexts/ContextUser";
import { storage } from "@/services/firebase/index";
import { InputsEdit, schema } from "./types";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { formatCpf } from "@/masks/cpf";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading";
import { ContextLoading } from "@/contexts/ContextLoading";

function FormEdit() {
  const [imgUrl, setImgUrl] = useState<string>(profileDefault);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [gender, setGender] = useState<string>("Other");
  const router = useRouter();
  const toast = useToast();
  const context = useContext(ContextUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsEdit>({
    resolver: yupResolver(schema),
  });
  const contextLoading = useContext(ContextLoading)!;
  const { setLoading, loading } = contextLoading;

  const onSubmit: SubmitHandler<InputsEdit> = async (data) => {
    
    const file = data.file;
    if (!context) {
      return;
    }
    const { user, setUser } = context;
    try {
      setLoading(true);
      if (!file || file.length === 0) {
        const res = await UpdateUserApi({
          userId: Number(user?.user_id),
          gender: data?.gender,
          profile: null,
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          phone: data.phone,
          birthdate: data.birthdate,
          cpf: data.cpf ? data.cpf.toString() : "",
        });
        if (res.status === 200 && res?.data?.user) {
          setUser(res?.data?.user);
          toast({
            title: "Updated user!",
            description: "User data is successfully updated.",
            status: "success",
            duration: 9000,
            isClosable: true,
            variant: "left-accent",
            position: "top-right",
          });
          return;
        }
        return toast({
          title: "Error updating user!",
          description: `${
            res.data?.msg || res.error || "Error updating user!"
          }`,
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "left-accent",
          position: "top-right",
        });
      } else {
        const storageRef = ref(storage, `images/${file[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            toast({
              title: "Error updating user!",
              description: "Error hosting image in firebase.",
              status: "error",
              duration: 9000,
              isClosable: true,
              variant: "left-accent",
              position: "top-right",
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {

              const res = await UpdateUserApi({
                userId: Number(user?.user_id),
                gender: data?.gender,
                profile: url,
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                phone: data.phone,
                birthdate: data.birthdate,
                cpf: data.cpf ? data.cpf.toString() : "",
              });
              if (res.status === 200 && res?.data?.user) {
                setUser(res?.data?.user);
                toast({
                  title: "Updated user!",
                  description: "User data is successfully updated.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  variant: "left-accent",
                  position: "top-right",
                });
                return;
              }
              return toast({
                title: "Error updating user!",
                description: `${
                  res.data?.msg || res.error || "Error updating user!"
                }`,
                status: "error",
                duration: 9000,
                isClosable: true,
                variant: "left-accent",
                position: "top-right",
              });
            });
          }
        );
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const toggleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCPF: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const formattedValue = formatCpf(value);
    setCpf(formattedValue);
  };

  useEffect(() => {
    if (!context) {
      return;
    }
    const { user } = context;

    setCpf(user?.cpf || "");
    setGender(user?.gender || "")
    
    setSelectedImage(
      user?.profile_img ||
        "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
    );
  }, [context]);
  
  if (!context) {
    return;
  }
  const { user } = context;

  return (
    <form
      className="z-10 flex items-center justify-center w-full flex-col px-20 max-sm:px-4 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative mt-8">
        <Image
          alt="profile logo"
          src={selectedImage}
          className="max-h-[115px] max-w-[115px] min-h-[115px] min-w-[115px] border-[6px] shadow-snipped border-solid border-custom-grayOne  rounded-full object-cover"
          width={115}
          height={115}
        />

        <label
          htmlFor="fileInput"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-49%] cursor-pointer "
        >
          <input
            {...register("file")}
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={toggleProfile}
            className="sr-only"
            disabled={loading ? true : false}
          />
          <div className="w-[108px] h-[108px] rounded-full flex items-center justify-center border-custom-grayOne bg-custom-grayOne/60 border-[2px] duration-300 ease-linear hover:bg-custom-grayTwo/90">
            <MdOutlinePhotoCameraBack className="text-5xl text-custom-textColor/60" />
          </div>
        </label>
      </div>
      <div className="mt-5 w-full flex flex-col items-start">
        <InputUi
          type="text"
          label="Username"
          pleaceholder="neydelas011"
          classname="w-full text-custom-textColor"
          name="username"
          register={register}
          error={errors?.username?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.username}
        />
        <InputUi
          type="text"
          label="Fullname"
          pleaceholder="Neymar Santos Junior"
          classname="w-full text-custom-textColor"
          name="fullname"
          register={register}
          error={errors?.fullname?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.fullname}
        />
        <InputUi
          type="email"
          label="Email"
          pleaceholder="neymar.arabia@gmail.com"
          classname="w-full text-custom-textColor"
          name="email"
          register={register}
          error={errors?.email?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.email}
        />
        <InputUi
          type="text"
          label="CPF"
          pleaceholder="xxx.xxx.xxx-xx"
          classname="w-full text-custom-textColor"
          name="cpf"
          value={cpf}
          change={handleCPF}
          register={register}
          error={errors?.cpf?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.cpf}
        />
        <div className="flex justify-between w-full gap-9 max-sm:flex-wrap max-sm:gap-0">
          <div className="w-1/2 flex gap-[1px] flex-col max-sm:w-full">
            <InputUi
              type="date"
              label="Date of birth"
              pleaceholder=""
              classname="w-full text-custom-textColor inputDate"
              name="birthdate"
              register={register}
              error={errors?.birthdate?.message}
              disabled={loading ? true : false}
              defaultvalue={user?.date_of_birth}
            />
          </div>
          <div className="w-1/2 flex gap-[1px] flex-col max-sm:w-full">
            <InputUi
              type="text"
              label="Phone"
              pleaceholder="11 99999-9999"
              classname="w-full text-custom-textColor"
              name="phone"
              register={register}
              error={errors?.phone?.message}
              disabled={loading ? true : false}
              defaultvalue={user?.phone}
            />
          </div>
        </div>
        <div>
          <label className={` mb-8 text-sm text-custom-textColor uppercase`}>
            Gender
          </label>
          <RadioGroup onChange={setGender} value={gender} >
            <Stack
              spacing={5}
              direction="row"
              color={"#fff"}
              fontSize={"6px"}
              marginTop={"4px"}
            >
              <Radio value="Feminine" {...register("gender")}>
                Feminine
              </Radio>
              <Radio value="Masculine" {...register("gender")}>
                Masculine
              </Radio>
              <Radio value="Other" {...register("gender")}>
                Other
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-end w-full gap-4 text-custom-textColor font-semibold mt-6 pb-6">
        <button
          type="button"
          className="py-2 px-6 border-2 border-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
          onClick={() => router.back()}
          disabled={loading ? true : false}
        >
          Cancel
        </button>
        {loading ? (
          <span className="py-2 px-6 bg-custom-pink rounded-md">
            <ImSpinner9 className="animate-spin text-3xl" />
          </span>
        ) : (
          <button
            disabled={loading}
            type="submit"
            className="py-2 px-6 bg-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}

export { FormEdit };
