import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase';

export const userDataApi = createApi({
    reducerPath: 'userData',
    baseQuery: fakeBaseQuery(),
    tagTypes: ["userData"],
    endpoints: (builder) => ({
        fetchUserData: builder.query({
            async queryFn(id) {
                try {
                    const q = query(collection(db, "users"), where("uid", "==", id));
                    const doc = await getDocs(q);
                    const data = { data: doc.docs[0].data(), docId: doc.docs[0].id };
                    return  {data}
                } catch (err) {
                    // console.log(err)
                }
            },
            providesTag: ["userData"]
        }),
    }),
});

export const {useFetchUserDataQuery} = userDataApi