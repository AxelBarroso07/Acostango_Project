import React from 'react'

function PageClases() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchDataCalendar = async () => {
      try {

        const HOST = import.meta.env.VITE_DB_HOST;
        const PORT = import.meta.env.VITE_PORT_SERVER;

        const response = await fetch(`http://${HOST}:${PORT}/calendar`, {
          'method': 'GET',
          'headers': {
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        console.log("Data calendar class:", data)
      } catch(error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDataCalendar()
  }, [])

  if(loading) {
    return <p>Cargando</p>;
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>waza</div>
  )
}

export default PageClases