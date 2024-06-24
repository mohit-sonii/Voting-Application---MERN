import { createContext } from "react";
const userContext = createContext({
     visitorType: '',
     changeVisitorType: () => {}
})

export default userContext