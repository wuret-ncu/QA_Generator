import React from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import ReadPicture from '../../picture/Reading.png'

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

      const labels = ['January', 'February', 'March','January', 'February', 'March']

     const dataLine = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          fill: true, // 設定填滿顏色
          data: ['15','11','12','15','16','14'],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    const options = {
      //  弧線
      cubicInterpolationMode: 'monotone',
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        // scaleOverride : true,
        x: {
          display: false,
          grid: {
            display: false,
           }
        },
        y: {
          display: false,
          beginAtZero: true,
          grid: {
            display: false,
           },
        }
      },
      plugins:{
        legend: {
          display: false,
      }
    }
    };
    
    const optionsPie = {
      maintainAspectRatio: false,
  responsive: true,
      plugins: {
        legend: {
            display: true,
            position: 'right'
        }
    }
    };

  return (
<div className="flex h-screen my-5" style={{ height: '80vh' }}>

    {/* 第一區塊 */}
  <div className="basis-2/5 flex-col">

            <div className='h-1/3 flex'>
                <div className="basis-1/2 px-3">
                  <div className="card lg:card-side bg-base-100 shadow h-full">
                      <div className="card-body max-h-div p-5">
                          <div className="text-xl">Reading Correct</div>
                          <div className="text-3xl ps-5 pt-3">89%</div>
                      </div>
                  </div>
                </div>
                <div className="basis-1/2 pr-3">
                <div className="card lg:card-side bg-base-100 shadow h-full">
                  <div className="card-body p-4">
              
                      <div className="text-xl">Reading Imporvement</div>
                      <div className="h-3/4 pt-5">
                        <Line options={options} data={dataLine} style={{ width: 100}} /> 
                      </div>
                  </div>
                </div>
                </div>
            </div>

            <div className='h-2/3 pt-3 px-3'>
              <div className="card lg:card-side bg-base-100 shadow h-full">
                      <div className="card-body p-4 ">
                        <div className="text-xl">Practice Topic</div>
                        <div className="h-5/6 pt-3">
                          <Pie data={data} options={optionsPie} style={{ height: 100}} />
                        </div>
                   
                      </div>
                  </div>
            </div>
  </div>

  {/* 第二區塊  要致中*/}
  <div className="basis-2/5">
    <div className="h-1/2 pr-3">
        <div className="card lg:card-side bg-base-100 shadow h-full">
            <div className="card-body p-4">
                <div className="text-xl">Reading Imporvement</div>
                <div className="h-5/6 pt-3">
                  <Bar data={dataLine} />
                </div>
            </div>
        </div>
    </div>
    <div className="h-1/2 pt-3 pr-3">
            <div className="card lg:card-side bg-base-100 shadow h-full">
                <div className="card-body p-5">
                    <div className="text-xl pb-3">Writing Skill</div>
                    <div className='flex'>
                        <img className="h-10" src={ReadPicture} alt="Shoes" />
                        <div className='flex-col ps-4'>
                          <div>文法</div>
                          <progress className="progress progress-error w-60" value="70" max="100"></progress>
                        </div>
                        <p className='text-base ps-4 self-end'>70% Correct</p>
                    </div>
                    <div className='flex'>
                        <img className="h-10" src={ReadPicture} alt="Shoes" />
                        <div className='flex-col ps-4'>
                          <div>文法</div>
                          <progress className="progress progress-error w-60" value="70" max="100"></progress>
                        </div>
                        <p className='text-base ps-4 self-end'>70% Correct</p>
                    </div>
                    <div className='flex'>
                        <img className="h-10" src={ReadPicture} alt="Shoes" />
                        <div className='flex-col ps-4'>
                          <div>文法</div>
                          <progress className="progress progress-error w-60" value="70" max="100"></progress>
                        </div>
                        <p className='text-base ps-4 self-end'>70% Correct</p>
                    </div>


                </div>
        </div>
    </div>
  
  </div>

  {/* 第三區塊 */}
  <div className="basis-1/5 pr-3">

  <div className="card lg:card-side bg-base-100 shadow h-full">

  <div className="card-body p-4">
    <div className='flex'>
        <p>Histiry</p>
        <input
        type="search"
        name="search"
        placeholder="Search"
        className="bg-white h-8 rounded-full text-sm focus:outline-none"
      />
    </div>
 

  <div className="overflow-y-auto ">
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