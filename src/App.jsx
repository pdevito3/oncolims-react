import React, { useState, Fragment, useEffect, useRef, useCallback } from 'react';
import { usePatients, pagination } from './apis/patients/usePatientList'
import useCreatePatient from './apis/patients/useCreatePatient'
import useUpdatePatient from './apis/patients/useUpdatePatient'
import useDeletePatient from './apis/patients/useDeletePatient'
import usePatient from './apis/patients/usePatient'
import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline'
import { SearchIcon, FilterIcon, XCircleIcon } from '@heroicons/react/solid'
import Dialog from './components/Dialog';
import PatientForm from './components/PatientForm';
import { useQueryParam, StringParam } from 'use-query-params';
import { debounce } from 'lodash'

function App() {
  //TODO Change pagenumber to XSTATE
  const [pageNumber, setPageNumber] = useState(1);
  const [patientIdToEdit, setPatientIdToEdit] = useState(null);
  const filterInput = useRef(null);
  const [filter, setFilter] = useQueryParam('filter', StringParam);
  const {data: patients, isSuccess: patientListIsSuccess, refetch: refetchPatientList } = usePatients({pageNumber, filter});
  const {data: patientRecord, isSuccess: patientRecordIsSuccess, isLoading: patientRecordIsLoading, refetch: refetchPatientRecord } = usePatient(patientIdToEdit);
  const createPatient = useCreatePatient();  
  const updatePatient = useUpdatePatient();  
  const deletePatient = useDeletePatient();  

  //TODO Change modal open to XSTATE
  let [addModalIsOpen, setAddModalIsOpen] = useState(false);
  let [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  function editPatient(patientId){
    setPatientIdToEdit(patientId);
    setUpdateModalIsOpen(true);
  }

  useEffect(() => {
    if(patientIdToEdit !== null && patientIdToEdit !== undefined) {
      refetchPatientRecord(patientIdToEdit);
    }
  }, patientIdToEdit)

const submitFilter = useCallback(
  (filter) => {
    if(filter?.length <= 0)
      setFilter(undefined) // clears queryparam
    
      refetchPatientList({pageNumber, filter})      
  },
  [filter, pageNumber],
)

  return (
    <>
      <header className="bg-emerald-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-3 flex items-center justify-between">
            <div className="flex items-center">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                />
              </a>
            </div>
            <div className="ml-10 space-x-4">
              <a
                href="/bff/login?returnUrl=/"
                className="inline-block bg-emerald-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Login
              </a>
            </div>
          </div>
        </nav>
      </header>
      


    {
      patientListIsSuccess && 
      <div className="mt-10 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className=" group w-full bg-emerald-500 h-10 px-6 flex items-center justify-between">
                  <p className="font-semibold text-white font-lg">
                    Patients
                  </p>

                  <div className="flex-1 flex items-center justify-end space-x-3 transition duration-150 ease-in">
                    <div className="w-30 lg:w-64 opacity-100">
                      <div className="flex">
                        <div className="flex-1 min-w-0">
                          <label htmlFor="filter" className="sr-only">
                            Filter
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <input
                              onKeyDown={(e) => {if(e.key === "Enter") submitFilter(filterInput?.current?.value)}} 
                              ref={filterInput}
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                              type="filter"
                              name="filter"
                              id="filter"
                              className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-4 sm:text-sm border-gray-300 rounded-md py-1"
                              placeholder="Filter"
                            />
                            <div className="absolute inset-y-0 right-1 flex items-center">
                              <label htmlFor="filter" className="sr-only">
                                Filter
                              </label>
                              
                              <button
                                onClick={() => submitFilter(filterInput?.current?.value)}
                                className="inline-flex justify-center p-1 shadow-sm text-sm font-medium rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer transition duration-100 ease-in"
                              >
                                <FilterIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Filter</span>
                              </button>
                            </div>
                          </div>
                        </div>                        
                      </div>
                    </div>

                    <button 
                      onClick={() => setAddModalIsOpen(true)}
                      className="text-white border border-white rounded hover:bg-white hover:text-emerald-500 transition duration-150 ease-in"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-6 py-3 w-20">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.data.map((patient) => (
                      <tr key={patient.patientId} className="group bg-white even:bg-gray-50">
                        <td className="py-4 whitespace-nowrap text-left text-sm font-medium flex items-center justify-center">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => editPatient(patient.patientId)}
                              className="hidden text-emerald-600 hover:text-emerald-900 group-hover:block transition duration-100 ease-in"
                            >
                                <PencilAltIcon className="w-5 h-5" /> 
                            </button>

                            <button 
                              onClick={() => deletePatient.mutate(patient.patientId)}
                              className="hidden text-emerald-600 hover:text-emerald-900 group-hover:block transition duration-100 ease-in"
                            >
                                <XCircleIcon className="w-5 h-5" /> 
                            </button>

                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.dob}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.internalId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* TODO - abstract out to a pagination component */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between sm:px-6"
          aria-label="Pagination"
        >
          {
            pagination && (
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{pagination.currentStartIndex}</span> to <span className="font-medium">{pagination.currentEndIndex}</span> of{' '}
                  <span className="font-medium">{pagination.totalCount}</span> results
                </p>
              </div>
            )
          }
          <div className="flex-1 flex justify-between sm:justify-end">
            {
              pagination && pagination.hasPrevious && (
                <button
                  onClick={() => setPageNumber(pageNumber - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )
            }
            {
              pagination && pagination.hasNext && (
                <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              )
            }
          </div>
        </nav>
      
        <Dialog isOpen={addModalIsOpen} setIsOpen={setAddModalIsOpen}>
          <PatientForm 
            onSubmit={createPatient.mutate}
            resetMutation={createPatient.reset}
            clearOnSubmit
            setIsOpen={setAddModalIsOpen}
            submitText={
              createPatient.isLoading
                ? 'Saving...'
                : createPatient.isError
                ? 'Error!'
                : createPatient.isSuccess
                ? 'Saved!'
                : 'Create Patient'
            }
          />
        </Dialog>
            
        {
          patientRecordIsLoading ? (
            <span>Loading...</span>
          ) : (
            <Dialog isOpen={updateModalIsOpen} setIsOpen={setUpdateModalIsOpen}>
            <PatientForm 
              onSubmit={updatePatient.mutate}
              resetMutation={updatePatient.reset}
              clearOnSubmit
              initialValues={patientRecord?.data}
              setIsOpen={setUpdateModalIsOpen}
              submitText={
                updatePatient.isLoading
                  ? 'Saving...'
                  : updatePatient.isError
                  ? 'Error!'
                  : updatePatient.isSuccess
                  ? 'Saved!'
                  : 'Update Patient'
              }
            />            
          </Dialog>
          )
        }
      </div>
    }
  </>
  );
}

export default App;
