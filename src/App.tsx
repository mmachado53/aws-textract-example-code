import { ChangeEvent, useCallback, useState } from 'react'
import './App.css'
import ResultsView from './ResultsView';
import { analyzeDocument } from './AWSTextrackUtils';
import { QueriesAndAnswers } from './models';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<QueriesAndAnswers>();
  const handleFilesCallback = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    const reader = new FileReader();
    setIsLoading(true);
    reader.onload = (event)=>{
      const result = event.target?.result;
      if(result){
        const uint8Array = new Uint8Array(result as ArrayBuffer)
        analyzeDocument(uint8Array).then((data)=>{
          setResults(data);
        }).catch((error)=>{
          alert(`something went wrong: ${error}`)
        }).finally(()=> setIsLoading(false));
      }
    
    };
    const files = event.target?.files;
  if(files && files.length > 0){
    reader.readAsArrayBuffer(files[0]);
  }
  },[setResults, setIsLoading]);


  return (
    <div style={{ textAlign: 'center', width:'100%' }}>
    {!isLoading && (
      <>
      <label>Attach an image of your health insurance card:</label> <br/><br/><br/>
      <input type="file" onChange={handleFilesCallback} id="insuranceCardFile" accept="image/png, image/jpeg" />
      { results && (
        <ResultsView queriesAndResults={results} />
      )}
      </>
    )}
    {isLoading && (
      <span>Loading...</span>
    )}
    </div>
  )
}

export default App
