import axios from 'axios';
import { useQuery } from 'react-query';
import { patientsBaseUrl } from '../constants'

const patientKeys = {
    patients: ['patients'],
    patient: (id) => [...patientKeys.patients, id]
}

const config = {
    headers: {}
}

const fetchPatient = async (patientId) =>
    axios.get(`${patientsBaseUrl}/${patientId}`, config)
        .then((res) => res.data);

export function usePatient(patientId) {
    return useQuery(
        patientKeys.patient(patientId),
        async () => fetchPatient(patientId),
        {
        }
    )
}


export let hasNextPage = false;
export let hasPreviousPage = false;
export let pagination;
const fetchPatients = async (pageSize = 6, pageNumber = 1) => {
    let res = await axios.get(`${patientsBaseUrl}?pagesize=${pageSize}&pageNumber=${pageNumber}`, config);
    pagination = JSON.parse(res.headers["x-pagination"]);

    return res.data;
}

export function usePatients() {
    return useQuery(
        patientKeys.patients,
        async () => fetchPatients(),
        {
        }
    )
}