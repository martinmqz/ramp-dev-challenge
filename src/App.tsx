import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const ulRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    fetchFlag().then((text) => {
      setIsLoading(false)
      typeWrite(text)      
    })
  }, [])

  return (
    <>
      { isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul className='flag' ref={ulRef}></ul>
      )}
    </>
  )
  
  function typeWrite(text: string, delay: number = 500) {
    let index = 0
    const intervalId = setInterval(() => {
      const el = document.createElement('li')
      el.textContent = text[index]
      ulRef.current!.appendChild(el)

      index++
      if (index >= text.length) {
        clearInterval(intervalId)
      }
    }, delay)
  }
}


async function fetchFlag() {
  const url = 'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a656e' //  document.querySelectorAll('section > article > div > b.ref') // https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge
  let text = ''

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    text = await response.text()
  }
  catch (error) {
    text = 'Error'
    console.error('Fetch error:', error)
  }

  return text
}



export default App
