import React from 'react'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const defaultFormValues = {
  firstName: null,
}
const schema = yup.object().shape({
  firstName: yup.string().required(),
});

function PatientForm({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
  setIsOpen
}) {  
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });
  const [values, setValues] = React.useState(initialValues)
  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }))

  const internalHandleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }
    e.preventDefault()
    onSubmit(values)
  }

  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues])
console.log(errors)
  return (
    <div>      
      <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Patient Information
            </h3>
          </div>

          <form className="mt-6 sm:mt-5" 
            onSubmit={handleSubmit(internalHandleSubmit)} 
            onKeyDown={(e) => {if(e.key === "Enter") internalHandleSubmit(e)}} 
          >
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                First Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                <input
                  type="text"
                  {...register("firstName")}
                  id="firstName"
                  autoComplete="given-name"
                  onChange={(e) => setValue('firstName', e.target.value)}
                  value={values.firstName}
                  className={classNames(
                    "max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md", 
                    {"focus:ring-emerald-500 focus:border-emerald-500 border-gray-300": !errors?.firstName}, 
                    {"border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500": errors?.firstName})
                  }
                  aria-invalid={errors?.firstName}
                  aria-describedby={errors?.firstName ? "invalid-first-name" : null}
                />
                { errors?.firstName && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-5 sm:mt-6 space-y-2">
          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={internalHandleSubmit} type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-emerald-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:border-emerald-700 focus:shadow-outline-emerald transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              {submitText}              
            </button>
          </span>

          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={() => setIsOpen(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>
    </div>
  )
}

export default PatientForm
