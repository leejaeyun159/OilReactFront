// import {useState} from 'react';
import { Card } from '../UI';

const ClovaSentiment = () =>{
  const textBoxHandler=()=>{

  }  
  
  return (
      <Card>
        
        <form onSubmit={textBoxHandler}>
          <textarea name='content'></textarea>
          <input type='submit' value='submit'></input>
        </form>
      </Card>
    );
}
export default ClovaSentiment;