import { createContext } from "react";
export const userContext = createContext({
     visitorType: '',
     visitorId: '',
     changeVisitorType: () => { },
     updateVisitorId: () => { }
})
export const candidateContext = createContext({
     candidateId: '',
     updateCandidateId: () => { }
})
