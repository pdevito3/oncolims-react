import axios from 'axios';
import { useQuery } from 'react-query';
import { patientsBaseUrl } from '../constants'

const patientKeys = {
    patients: (pageNumber) => ['patients', pageNumber],
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


export let pagination;
const fetchPatients = async (pageNumber = 1, pageSize = 6) => {
    let res = await axios.get(`${patientsBaseUrl}?pagesize=${pageSize}&pageNumber=${pageNumber}`, config);
    pagination = JSON.parse(res.headers["x-pagination"]);

    return res.data;
}

export function usePatients(pageNumber) {
    return useQuery(
        [patientKeys.patients, { pageNumber }],
        async () => fetchPatients(pageNumber),
        {
        }
    )
}