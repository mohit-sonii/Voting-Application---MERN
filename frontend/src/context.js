import { createContext } from "react";
export const userContext = createContext({
     visitorType: '',
     changeVisitorType: () => {}
})
export const candidateContext = createContext({
     candidateId:'',
     updateCandidateId:()=>{}
})