import React,{useState, useEffect, useContext} from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import Finder from '../../API/Finder'
import { Context } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom"


function Read() {
  const [correctRate, setCorrectRate] = useState(null);
  const [writeImprove, setWriteImprove] = useState([]);
  const [pieLabel, setPieLabel] = useState([]);
  const [dataLine, setDataLine] = useState({});
  const [dataPie, setDataPie] = useState({});
  // const [history, setHistory] = useState({});

  const { history, setHistory } = useContext(Context);
  const { historyIndex, setHistoryIndex } = useContext(Context);
  const { historyPageId, setHistoryPageId } = useContext(Context);
  const { historyType, setHistoryType } = useContext(Context);
  const navigate = useNavigate();



  useEffect(()=>{
    const id = localStorage.getItem('user');
    const fetchData = async () => {
      try {
        const response = await Finder.get(`/analysis/read/${id}`);
        setCorrectRate(response.data.accuracy);
        const response1 = await Finder.get(`/analysis/write/${id}`);
        setWriteImprove(response1.data)
        const response2 = await Finder.get(`/topic/${id}`);
        setPieLabel(response2.data)
        const response3 = await Finder.get(`/analysis/topic/${id}`);
        console.log(response3.data)
        setHistory(response3.data)
        
      } catch (err) {
        console.log(err)
      } 
    };
    fetchData()
  },[])


  useEffect(() => {
   if(history.length >0){
    console.log(123)
   }
  }, [history]);

  useEffect(() => {
    if(writeImprove.length>0){
      console.log(writeImprove)
      //建立對應數量的x軸
      const array = Array(Object.entries(writeImprove).length).fill("a");

      setDataLine({
        labels: array,
        datasets: [
          {
            labels: 'testdata',
            fill: true, // 設定填滿顏色
            data: writeImprove,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      })
    }
  }, [writeImprove]);

useEffect(() => {
  if(pieLabel.length >0){
    const uniqueArr = [...new Set(pieLabel)];

    const count = {};
      pieLabel.forEach(element => {
      count[element] = count[element] ? count[element] + 1 : 1;
    });
    const countArray = Object.values(count);

    setDataPie({
      labels: uniqueArr,
      datasets: [
        {
          label: '# of Votes',
          data: countArray,
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
    });
  }
}, [pieLabel]);
     

// 畫圖設定參數
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



function CallHistory(history, index){
  setHistoryIndex(index);
  setHistoryPageId(history.id);
  const type = history.UserWriteArticle ? 'write' : 'read';
  setHistoryType(type);
  navigate('/history')

}

  return (
<div className="flex h-screen my-5 mx-5" style={{ height: '80vh' }}>

    {/* 第一區塊 */}
  <div className="basis-2/5 flex-col">

            <div className='h-1/3 flex'>
                <div className="basis-1/2 px-3">
                  <div className="card lg:card-side bg-base-100 shadow h-full">
                      <div className="card-body max-h-div p-5">
                          <div className="text-xl">Reading Correct</div>
                          { correctRate ? <div className="text-5xl ps-5 pt-3">{Math.round(correctRate*100)/100} %</div> :
                             <div className="text-3xl ps-5 pt-6"> -- </div>
                          }
                  
                      </div>
                  </div>
                </div>
                <div className="basis-1/2 pr-3">
                <div className="card lg:card-side bg-base-100 shadow h-full">
                  <div className="card-body p-4">
              
                      <div className="text-xl">Write Improvement</div>
                      <div className="h-3/4 pt-5">
                         { 
                          Object.keys(dataLine).length > 0 ? <Line options={options} data={dataLine} style={{ width: 100}} /> : <div className="text-3xl ps-5 pt-3"> -- </div>
                        } 
                        
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
                          { Object.keys(dataPie).length > 0 ? 
                              <Pie data={dataPie} options={optionsPie} style={{ height: 100}} /> : <div className="text-3xl ps-5 pt-5 px-5"> - No Practice Record - </div>
                          }
                        </div>
                   
                      </div>
                  </div>
            </div>
  </div>

  {/* 第二區塊  要致中*/}
  {/* <div className="basis-2/5">
    <div className="h-1/2 pr-3">
        <div className="card lg:card-side bg-base-100 shadow h-full">
            <div className="card-body p-4">
                <div className="text-xl">Reading Improvement</div>
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
  
  </div> */}

  {/* 第三區塊 */}
  <div className="basis-3/5 pr-3">

  <div className="card lg:card-side bg-base-100 shadow h-full">

  <div className="card-body p-4">
    <div className='flex'>
        <p className="text-xl">History</p>
        {/* <input
        type="search"
        name="search"
        placeholder="Search"
        className="bg-white h-8 rounded-full text-sm focus:outline-none"
      /> */}
    </div>
 

  <div className="overflow-y-auto p-5">
  <table className="table-auto w-full p-5">
    <tbody>
      {history.length >0 ? (
        history.map((each,index) => {
          const article = each.UserWriteArticle ? each : each.ReadArticle;
          const topic = each.UserWriteArticle ? each.UserWriteArticle.topic : each.ReadArticle.topic;
          const type = each.UserWriteArticle ? 'Write' : "Read";
  
          return (
          <tr key={index} onClick={event => CallHistory(each, index)} className='hover:bg-gray-200 p-3'>
            <td className="w-full">
              <div className="flex items-center space-x-3 py-2">
                <div>
                  <div className="text-xl font-bold">{index+1}. {article.title}</div>
                  <div className="">Topic : {topic}</div>
                  <div className="text-sm opacity-50">{each.createdAt.slice(0,10)}</div>
                </div>
              </div>
            </td>
            <td className="px-5 w-full">
              <p>{type}</p>
            </td>
            <td className="px-5 w-full">
              <p>{each.score}</p>
            </td>
          </tr>
        )})
      ) : 
      <tr>
        <td>
        <div className="text-3xl ps-5 pt-3 text-center">
          <div className="py-5">
          - No History Record -
          </div>
          <div>
          - Please Keep Practice - 
          </div>
        </div>
        </td>
      </tr>
      }
    </tbody>
  </table>
</div>


  </div>
</div>
</div>
</div>
  )
}

export default Read