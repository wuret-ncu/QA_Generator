import React from 'react'
import ReadPicture from '../picture/Reading.png'
import WritePicture from '../picture/writing.jpeg'
import AnalysisPicture from '../picture/analysis.jpeg'
import { useNavigate } from "react-router-dom"

function Card() {
    const navigation = useNavigate()

  return (
    <div className='container'>
        <div className='flex mt-5 flex-wrap justify-center items-center'>
        <div className="card w-96 bg-base-100 shadow-xl overflow-hidden">
            <figure><img className="h-auto" src={ReadPicture} alt="Shoes" /></figure>
            <div className="card-body bg-card-pink">
                <h2 className="card-title">Reading Test!</h2>
                <p>If a dog chews shoes</p>
                <div className="card-actions justify-end">
                <button className="btn bg-white text-black border-none hover:bg-gray-300" onClick={e => navigation('/read')}>Choose</button>
                </div>
            </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5 overflow-hidden">
            <figure><img className="h-auto" src={WritePicture} alt="Shoes" /></figure>
            <div className="card-body bg-card-blue">
                <h2 className="card-title">Writing Test!</h2>
                <p>If a dog chews shoes w</p>
                <div className="card-actions justify-end">
                <button className="btn bg-white text-black border-none hover:bg-gray-300" onClick={e => navigation('/write')}>Choose</button>
                </div>
            </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl overflow-hidden">
            <figure><img className="h-auto" src={AnalysisPicture} alt="Shoes" /></figure>
            <div className="card-body bg-card-gray">
                <h2 className="card-title">Analysis!</h2>
                <p>Evaluate your test scoress</p>
                <div className="card-actions justify-end">
                <button className="btn bg-white text-black border-none hover:bg-gray-300" onClick={e => navigation('/analysis')}>Choose</button>
                </div>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Card