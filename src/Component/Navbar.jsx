import React from 'react'

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 bg-theme-green">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl text-white">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white">
            <li><a href="/">Home</a></li>
            <li><a href="/read">Read</a></li>
            <li><a href="/write">Write</a></li>
            <li><a href="/analysis">Analysis</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar