import React, { useState, Fragment, useEffect } from 'react';
import { usePatients, pagination } from './apis/patients/usePatientList'
import useCreatePatient from './apis/patients/useCreatePatient'
import useUpdatePatient from './apis/patients/useUpdatePatient'
import usePatient from './apis/patients/usePatient'
import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline'
import Dialog from './components/Dialog';
import PatientForm from './components/PatientForm';

function App() {
  //TODO Change pagenumber to XSTATE
  const [pageNumber, setPageNumber] = useState(1);
  const [patientIdToEdit, setPatientIdToEdit] = useState(null);
  const {data: patients, isSuccess: patientListIsSuccess } = usePatients(pageNumber);
  const {data: patientRecord, isSuccess: patientRecordIsSuccess, isLoading: patientRecordIsLoading, refetch: refetchPatientRecord } = usePatient(patientIdToEdit);
  const createPatient = useCreatePatient();  
  const updatePatient = useUpdatePatient();  

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

  return (
    <>
      <header className="bg-emerald-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between">
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
      <div className="p-20">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className=" group w-full bg-emerald-500 h-10 px-6 flex items-center justify-between">
                  <p className="font-semibold text-white font-lg">
                    Patients
                  </p>
                  <button 
                    onClick={() => setAddModalIsOpen(true)}
                    className="hidden text-white border border-white rounded hover:bg-white hover:text-emerald-500 transition-all duration-150 ease-in group-hover:block"
                  >
                      <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative px-6 py-3 w-16">
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
                          <button 
                            onClick={() => editPatient(patient.patientId)}
                            className="hidden text-emerald-600 hover:text-emerald-900 group-hover:block"
                          >
                              <PencilAltIcon className="w-5 h-5" /> 
                          </button>
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
