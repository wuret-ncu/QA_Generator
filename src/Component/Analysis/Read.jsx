import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement,);

function Read() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const labels = ['January', 'February', 'March','January', 'February', 'March','January', 'February', 'March']

     const dataLine = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: ['12','11','12'],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };


    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

    const optionBar = {
      
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    xAxes: [
      {
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        gridLines: { display: false },
      },
    ],
    yAxes: [
      {
        ticks: { display: false },
        gridLines: { display: false },
      },
    ],
  },
};
    
  return (
<div className="flex h-screen mt-2">

    {/* 第一區塊 */}
  <div className="basis-2/5 flex-col">

    <div className="h-1/2 flex">
        <div className='basis-1/2'>

            <div className='h-1/3 p-3'>
                <div className="card lg:card-side bg-base-100 shadow max-h-div">
                    <div className="card-body p-5">
                        <div className="text-base">Total Page Views</div>
                        <div className="text-2xl">89%</div>
                    </div>
                </div>
            </div>

            <div className='h-2/3 overflow-y-auto p-3'>
                <div className="card lg:card-side bg-base-100 shadow max-h-div">
                  <div className="card-body p-3">
                    <Line options={options} data={dataLine} />
                  </div>
                </div>
            </div>
        </div>
        {/* <div className='basis-1/2 pr-3'>
                <div className="card lg:card-side bg-base-100 shadow max-h-div">
                    <div className="card-body p-2">
                        <Pie data={data} />
                    </div>
                </div>

        </div> */}
    </div>
    <div className="h-1/2 p-3">
            <div className="card lg:card-side bg-base-100 shadow">
                <div className="card-body p-2">
                    <h2 className="card-title">Writing Skill</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className='flex'>
                        <progress className="progress progress-error w-80" value="70" max="100"></progress>
                        <p>70% Correct</p>
                    </div>

                    <progress className="progress progress-error w-56" value="70" max="100"></progress>
                    <progress className="progress progress-error w-56" value="70" max="100"></progress>
                </div>
        </div>
    </div>
  </div>

  {/* 第二區塊 */}
  <div className="basis-2/5">
    <div className="h-1/2 pr-3">
        <div className="card lg:card-side bg-base-100 shadow max-h-div">
            <div className="card-body p-3">
                <Bar options={options} data={dataLine} />
            </div>
        </div>
    </div>
    <div className="h-1/2 pt-3 pr-3">
            <div className="card lg:card-side bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Writing Skill</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className='flex'>
                        <progress className="progress progress-error w-80" value="70" max="100"></progress>
                        <p>70% Correct</p>
                    </div>

                    <progress className="progress progress-error w-56" value="70" max="100"></progress>
                    <progress className="progress progress-error w-56" value="70" max="100"></progress>
                </div>
        </div>
    </div>
  
  </div>

  {/* 第三區塊 */}
  <div className="basis-1/5 pr-3">

  <div className="card lg:card-side bg-base-100 shadow ">

  <div className="card-body p-5">
    <div className='flex'>
        <p>Histiry</p>
        <input
        type="search"
        name="search"
        placeholder="Search"
        className="bg-white h-8 rounded-full text-sm focus:outline-none"
      />
    </div>
 

  <div className="overflow-y-auto w-full">
  <table className="table w-full">
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">Title</div>
              <div className="text-sm opacity-50">Topic</div>
            </div>
          </div>
        </td>
        <td>
          <p>1</p>
        </td>
      </tr>
      {/* row 2 */}
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          <p>2</p>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          <p>2</p>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          <p>2</p>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          <p>2</p>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th> &lt; </th>
        <th> &gt; </th>
      </tr>
    </tfoot>
  </table>
</div>


  </div>
</div>
</div>
</div>
  )
}

export default Read