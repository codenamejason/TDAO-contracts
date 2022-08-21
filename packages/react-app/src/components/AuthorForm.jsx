import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const AuthorForm = ({ register, control, handleSubmit, reset, formState, watch }) => {
  // functions to build form returned by useForm() and useFieldArray() hooks
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({ name: "tickets", control });

  // watch to enable re-render when author number is changed
  const numberOfAuthors = watch("numberOfAuthors");

  useEffect(() => {
    // update field array when author number changed
    const newVal = parseInt(numberOfAuthors || 0);
    const oldVal = fields.length;
    if (newVal > oldVal) {
      // append authors to field array
      for (let i = oldVal; i < newVal; i++) {
        append({ firstName: "", lastName: "" });
      }
    } else {
      // remove authors from field array
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [append, fields.length, numberOfAuthors, remove]);

  return (
    <>
      <h5 className="text-left justify-left">
        If you want to remain anonymous, you may leave one or both name fields blank. You may also use a pseudonym.
      </h5>
      <div className="border-bottom">
        <div className="form-row">
          <div className="form-group text-left">
            <label className="block text-left text-sm font-medium text-gray-700">Number of Authors</label>
            <select
              name="numberOfAuthors"
              {...register("numberOfAuthors")}
              className={`form-control mt-1 block w-1/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                errors.numberOfAuthors ? "is-invalid" : ""
              }`}
            >
              {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.numberOfAuthors?.message}</div>
          </div>
        </div>
      </div>
      {fields.map((item, i) => (
        <div key={i} className="list-group list-group-flush">
          <div className="list-group-item">
            <h5 className="card-title block text-left text-sm font-medium text-gray-700">Author {i + 1}</h5>
            <div className="form-row">
              <div className="form-group col-6">
                <label className="block text-left text-sm font-medium text-gray-700">First Name</label>
                <input
                  name={`tickets[${i}]name`}
                  {...register(`tickets.${i}.name`)}
                  type="text"
                  className={`form-control mt-1 block w-1/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                    errors.tickets?.[i]?.name ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.tickets?.[i]?.name?.message}</div>
              </div>
              <div className="form-group col-6">
                <label className="block text-left text-sm font-medium text-gray-700">Last Name</label>
                <input
                  name={`tickets[${i}]email`}
                  {...register(`tickets.${i}.email`)}
                  type="text"
                  className={`form-control mt-1 block w-1/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                    errors.tickets?.[i]?.email ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.tickets?.[i]?.email?.message}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorForm;
