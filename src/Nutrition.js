import photoFour from "./circle.png";

export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
           <ul key={label}>
               <li><img className="checkPhoto" src={photoFour} alt="Circle" width="16px"/><span className="label">{label}:</span> {quantity.toFixed(1)} {unit}</li>
           </ul>
        </div>
   )
}
