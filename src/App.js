import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
    const APP_ID = '9c2566bb';
    const APP_KEY = 'b18113c303d261679f7ef94e11160a31';
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    useEffect(() => {
        getRecipes();
    }, [query]);

    async function getRecipes() {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
    }

    function updateSearch(e) {
        setSearch(e.target.value);
    }

    function getSearch(e) {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="search-result-text">
                {query.trim().length ? `Search results for ` : ''}
                <b>{query.trim().length ? `"${query}"` : ''}</b>
            </div>
            <div className="recipes">
                {recipes.map((recipe) => {
                    recipe = recipe.recipe;
                    return <Recipe
                        key={Math.random()}
                        title={recipe.label}
                        calories={recipe.calories}
                        image={recipe.image}
                        ingredients={recipe.ingredients}
                    />
                })}
            </div>
        </div>
    );
}

export default App;
