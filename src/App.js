import { useState } from "react";
import { useEffect } from "react";
import { Nutrition } from "./Nutrition";
import photoOne from "./food.jpg";
import photoTwo from "./meal.jpg";
import photoThree from "./checkMark.png";
import photoFive from "./search.png";
import './App.css';
import Loader from "./Loader/Loader";
import Swal from 'sweetalert2';

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();

  const [loader, setLoader] = useState(false);

  const APP_ID = '708e98cb';
  const APP_KEY = 'c84541fec3751b18843b567a5a6c1177';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'


  const fetchData = async (ingr) => {

    setLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ ingr: ingr })
      
    })

    if (response.ok) {
      setLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    }

    else {
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please check ingredient spelling or quantity!",
      });
    }

  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    
    <div className="container">

      {loader && <Loader/>}

      <img src={photoTwo} className="photoTwo" alt="Meal" width="250px"/>

      <h1>Nutrition Analysis</h1>
      <ul>
        <li><img className="checkPhoto" src={photoThree} alt="Check mark" width="20px"/>Enter an ingredient or list of ingredients</li>
        <li><img className="checkPhoto" src={photoThree} alt="Check mark" width="20px"/>Use comma between ingredients</li>
        <li><img className="checkPhoto" src={photoThree} alt="Check mark" width="20px"/>Example: 1 cup rice, 1 tomato, 10 oz chickpeas</li>
      </ul>

      <form onSubmit={finalSearch}>
          <input 
            placeholder="Ingredient..."
            onChange={myRecipeSearch}
          />
          <button type="submit"><img src={photoFive} alt="Search" width="30px"/></button>
      </form>

        <div className="results">
            <div>
              {
                myNutrition &&  <p><span className="nutrition">Your ingredients: </span>{wordSubmitted}</p>
              }
            </div>

          <div>
            {
              myNutrition && <p><span className="nutrition">Weight:</span> {myNutrition.totalWeight} g</p>
            }
          </div>

        {
          myNutrition && <p> <span className="nutrition">Calories:</span> {myNutrition.calories} kcal</p>
        }
        
            {
              myNutrition && Object.values(myNutrition.totalNutrients)
                .map(({ label, quantity, unit }) =>
                  <Nutrition key={label}
                    label={label}
                    quantity={quantity}
                    unit={unit}
                  />
                )
            }

    </div>
    <div>
        <img src={photoOne} className="photoOne" alt="Meal" />
      </div>
      </div>
  );
}

export default App;
