import Button from "./Button"
import '../Styles/LandingPage.css'
import { useAuth } from "../Context"

function LandingPage() {
     const { userType } = useAuth()
     return (
          <>
               <section>
                    <div>
                         <p className="heading text-6xl md:text-7xl lg:text-8xl">Your Voice, Your Vote, Your Future.</p>
                         <p className="subheading  text-2xl md:text-3xl lg:text-4xl">Shape the Country you want to live in. Participate in the democratic process and let your voice be heard. Every vote counts towards building a better future.</p>
                         {/* if the user is null that means it is the first time visiting. If it did login and validate as user then do navigate the button to candidate list to vote and if not then do navigate signup  */}
                         {userType === '' ?
                              <Button innerText={'Vote Now'} link={'api/v1/auth/register'} />
                              : <Button innerText={'Vote Now'} />
                         }
                    </div>
               </section>
          </>
     )
}

export default LandingPage