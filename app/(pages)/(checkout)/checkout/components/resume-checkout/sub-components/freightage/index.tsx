import { Inputs, schema } from "@/(pages)/(checkout)/checkout/components/resume-checkout/sub-components/freightage/types/index";
import { SubmitHandler, useForm } from "react-hook-form";
import {InputUi} from "@/components/ui/inputs/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { SlArrowRightCircle } from "react-icons/sl";
import React from "react";


function Freightage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({ resolver: yupResolver(schema) });
      
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const cep = data.cep;
        try {
          alert("cep pesquisado");
        } catch (error) {
          alert("cep nao pesquisado");
        } finally {
        }
      };

  return (
    <form className="flex-col mt-4">
        <div className="w-full flex gap-2 items-center relative">
          <div className="flex w-full flex-col">
            <InputUi
              type="text"
              pleaceholder="00000-000"
              label="FREIGHTAGE"
              name="freightage"
              classname="shadow-snipped"
              register={register}
            />
          </div>
          <button
            type="submit"
            className="py-3.5 rounded-sm absolute right-4 top-6 z-10 flex items-center justify-center text-2xl"
          >
            <SlArrowRightCircle />
          </button>
        </div>
      </form>
  )
}

export {Freightage};