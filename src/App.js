import React, {useEffect} from 'react';
import './App.css';
import Todos from "./components/Todos/Todos";
import { withLoadingScreen } from 'react-redux-pull';

function App({todos}) {
  useEffect(() => {
    console.log('component is being mounted', []);
  });
  return (
    <div className="App">
      <Todos/>
    </div>
  );
}

export default withLoadingScreen([{
  propName: 'todos',
  url: 'https://lightpanda.herokuapp.com/api/todos/'
}])(App);
