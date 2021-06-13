
import { QueryClient } from 'react-query';

const baseUrl = "https://localhost:1200/api";

export const queryClient = new QueryClient();

export const patientsBaseUrl = `${baseUrl}/patients`;

export const patientKeys = {
  patients: (pageNumber) => ['patients', 'page', pageNumber],
  patient: (id) => ['patient', id]
}