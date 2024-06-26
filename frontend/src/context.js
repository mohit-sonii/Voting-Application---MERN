import { createContext } from "react";

export const userContext = createContext({
     visitorType: '',
     visitorId: '',
     userData: {},
     changeVisitorType: () => { },
     updateVisitorId: () => { },
     updateUserData: () => { }
})

export const candidateContext = createContext({
     candidateId: '',
     updateCandidateId: () => { }
})