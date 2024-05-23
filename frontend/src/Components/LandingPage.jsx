import Button from "./Button"
import '../Styles/LandingPage.css'

function LandingPage() {
     return (
          <>
               <section>
                    <div>
                         <p className="heading text-6xl md:text-7xl lg:text-8xl">Your Voice, Your Vote, Your Future.</p>
                         <p className="subheading  text-2xl md:text-3xl lg:text-4xl">Shape the Country you want to live in. Participate in the democratic process and let your voice be heard. Every vote counts towards building a better future.</p>
                         <Button innerText={'Vote Now'} />
                    </div>
               </section>
          </>
     )
}

export default LandingPage