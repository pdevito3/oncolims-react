import React, { useState, useEffect } from 'react';
import { usePatients, pagination } from './apis/patients/patients'
import { PencilAltIcon } from '@heroicons/react/outline'

function App() {
  const {data: patients, isLoading, isSuccess } = usePatients();
  
  return (
    <>
    {
      isSuccess && 
      <div className="p-20">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                      <tr key={patient.patientId} className="group">
                        <td className="py-4 whitespace-nowrap text-left text-sm font-medium flex items-center justify-center">
                          <button className="hidden text-indigo-600 hover:text-indigo-900 group-hover:block">
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
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </a>
              )
            }
            {
              pagination && pagination.hasNext && (
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </a>
              )
            }
          </div>
        </nav>
      </div>
    }
  </>
  );
}

export default App;
