import {useState, useEffect} from 'react'
import axios from 'axios'

import BarChartComponent from '../BarGraph'

import './index.css'

const Table = ({page, setPage}) => {
  const [barChartData, setBarChartData] = useState([])
  //   const [barChartData, setBarChartData] = useState({})

  const [salesData, setSalesData] = useState({})
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [month, setMonth] = useState('03')
  const getMonthName = monthNumber => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return months[monthNumber - 1]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/transactions`, {
          params: {
            page,
            perPage: 10,
            search,
            month,
          },
        })

        setTransactions(response.data)

        const totalItemsSaleAmountResponse = await axios.get(
          `http://localhost:3001/totalItems-sale-amount/${month}`,
        )

        // Assuming the response data has properties like totalSaleAmount, totalSoldItems, totalNotSoldItems
        setSalesData(totalItemsSaleAmountResponse.data[0])
        console.log(totalItemsSaleAmountResponse.data)

        const responseChart = await axios.get(
          `http://localhost:3001/bar-chart-data/${month}`,
        )
        setBarChartData(responseChart.data)
        console.log(responseChart.data)

        setLoading(false)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [page, search, month])
  return (
    <div>
      <h2 className="main">Transactions</h2>
      {/* Add dropdown for month selection */}
      <div className="flexing">
        <select
          value={month}
          className="margin-left"
          onChange={e => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>

          {/* Add options for other months */}
        </select>
        {/* Add search input */}
        <input
          className="margin-right"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={index % 2 === 0 ? 'even' : 'odd'}
              >
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold}</td>
                <td>
                  {transaction.image && (
                    <img
                      src={transaction.image}
                      className="image-size"
                      alt="Product"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Add pagination buttons */}
      <button
        type="button"
        className="prev"
        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
      >
        Prev
      </button>

      <button
        className="next"
        type="button"
        onClick={() => setPage(prevPage => prevPage + 1)}
      >
        Next
      </button>

      <div className="card-container">
        <div className="inner">
          <h1 className="name">Statistics-{getMonthName(parseInt(month))}</h1>

          <div className="cards">
            <h2>Total Sale Amount: {salesData.totalSaleAmount}</h2>
            <h2>Total Sold Items: {salesData.totalSoldItems}</h2>
            <h2>Total Not Sold Items: {salesData.totalNotSoldItems}</h2>
          </div>
        </div>
      </div>
      {/* <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Bar Chart</h2>
            <Bar data={barChartData} />
          </div>
        )}
      </div> */}

      <div>
        <h1 className="last">
          Bar Chart Stats - {getMonthName(parseInt(month))}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BarChartComponent barChartData={barChartData} />
        )}
      </div>
    </div>
  )
}

export default Table
