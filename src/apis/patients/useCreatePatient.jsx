import React from 'react'
import axios from 'axios'
import { patientsBaseUrl, queryClient } from '../constants'
import { useMutation } from 'react-query'

export default function useCreatePost() {
  return useMutation(
    (values) => axios.post(`${patientsBaseUrl}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        // queryClient.cancelQueries(['patients','page'])

        // const oldPosts = queryClient.getQueryData(['patients','page'])

        // queryClient.setQueryData(['patients','page'], (old) => {
        //   return [
        //     ...old,
        //     {
        //       ...values,
        //       id: Date.now(),
        //       isPreview: true,
        //     },
        //   ]
        // })

        // return () => queryClient.setQueryData(['patients','page'], oldPosts)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryClient.invalidateQueries(['patients','page']),
    }
  )
}