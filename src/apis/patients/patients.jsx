import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = "https://localhost:1200/api";

const patientKeys = {
    patients: ['patients'],
    patient: (id) => [...patientKeys.patients, id]
}

const config = {
    headers: {}
}

const fetchPatient = async (patientId) =>
    axios.get(`/patients/${patientId}`, config)
        .then((res) => res.data);

export function usePatient(patientId) {
    return useQuery(
        patientKeys.patient(patientId),
        async () => fetchPatient(patientId),
        {
        }
    )
}

const fetchPatients = async () =>
    axios.get(`${baseUrl}/patients`, config)
        .then((res) => res.data);

export function usePatients() {
    return useQuery(
        patientKeys.patients,
        async () => fetchPatients(),
        {
        }
    )
}