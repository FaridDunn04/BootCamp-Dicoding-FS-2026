import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Link,Routes,Route} from 'react-router-dom';

function HomePage(){
  return <p>This Home Page</p>
}

function AboutPage(){
  return <p>This About Page</p>
}

function FAQPage(){
  return <p>This FAQ Page</p>
}

function App(){
  return (
    <>
    <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
    </header>
    <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/faq" element={<FAQPage />}/>
        </Routes>
    </main>
  </>
  )

}

const root=createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
);