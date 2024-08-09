import React, { useState } from 'react'
import './Dictionary.css'

const Dictionary = () => {
    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [error, setError] = useState(false);
    const handleSearchMeaning = async() => {
        try{
        console.log('Search meaning button clicked')
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (!response.ok) {
            throw new Error('Word not found');
        }
        console.log(response)
        const data = await response.json()
        console.log(data)
        console.log(data[0].meanings[0].definitions)
        console.log(data[0].meanings[0].partOfSpeech)
        const meanings = data[0].meanings.flatMap(meaning => 
            meaning.definitions.map(def => def.definition)
        );
        console.log("these are the meanings", meanings)
        const synonyms = data[0].meanings[0].definitions.flatMap(s =>
            s.synonyms || [])
            

        console.log("these are the synonyms", synonyms)
        // console.log(synonyms)
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        console.log("part of speech->",  partOfSpeech);
        setMeanings(meanings);  
        setSynonyms(synonyms);
        setPartOfSpeech(partOfSpeech);
        setError(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMeanings([]);
            setSynonyms([]);
            setPartOfSpeech("");
            setError("Sorry, we couldn't find a definition for that word.");
        }

    }
  return (
    <div className='Dictionary-page'>
        <div className="dictionary-header">
            <h1>Dictionary</h1>
        </div>
        <div className="content-place">
            <p>Search for any word you want</p>
        </div>
        <div className="dictionary-view">
            <label>searching for {word}:</label>
            <input type="text" 
             value={word}
             onChange={(e) => setWord(e.target.value)}/>
            <button onClick={handleSearchMeaning}>Search</button>
        </div>
        <div className="defionitions">
        {/* {error && <p>{error}</p>} */}
                {partOfSpeech && <p><strong>Part of Speech:</strong> {partOfSpeech}</p>}
                {meanings.length > 0 ? (
                    <div>
                        <h3>Meanings:</h3>
                        <ul>
                            {meanings.map((meaning, index) => (
                                <li key={index}>{meaning}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No meanings found.</p>
                )}
                 {synonyms.length > 0 ? (
                    <div>
                        <h3>Synonyms:</h3>
                        <ul>
                            {synonyms.map((synonym, index) => (
                                <li key={index}>{synonym}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No synonyms found.</p>
                )}
            </div>
        </div>
    
  )
}

export default Dictionary