import React from 'react'

function Navbar() {
  return (
    <div>

<div className="navbar bg-base-100">
  <div className="flex-1">
    <a href="/" className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a href="/">Home</a></li>
      <li><a href="/read">Read</a></li>
      <li><a href="/write">Write</a></li>
      <li><a href="/analysis">Analysis</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </div>
</div>
          {/* <Nav className="ms-auto ">
            <Nav.Link className='pe-5' href="/">Home</Nav.Link>
            <Nav.Link className='pe-5' href="/read">Read</Nav.Link>
            <Nav.Link className='pe-5' href="/write">Write</Nav.Link>
            <Nav.Link className='pe-2' href="/analysis">Analysis</Nav.Link>
            <Nav.Link className='pe-2' href="/logout">Logout</Nav.Link>
          </Nav> */}

    </div>
  )
}

export default Navbar