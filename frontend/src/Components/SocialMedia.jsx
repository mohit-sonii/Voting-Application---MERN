
import "../Styles/SocialMedia.css"
const SocialMedia = (props) => {
     return (
          <div id="socialMedia" className="w-24 h-12 flex justify-center items-center p-2 cursor-pointer" style={{ backgroundColor: ` rgb(84, 18, 238)`, borderRadius: `3px` }}>
               <span>
                    <a href={`https://${props.link}`} target="_blank">

                         <img src={props.icon} alt="Socail Media image" style={{ width: `2rem`, height: `2rem` }} />
                    </a>
               </span>
          </div>
     )
}
export default SocialMedia