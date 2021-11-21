import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const [singleDrink, setSingleDrink] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setSingleDrink(newCocktail);
        } else {
          setSingleDrink([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!SingleCocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  }

  const { name, image, info, ingredients, category, instructions, glass } =
    singleDrink;
  // console.log(ingredients);
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        Back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients &&
              ingredients.map((item, idx) => {
                return item ? <span key={idx}>{item}</span> : null;
              })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
