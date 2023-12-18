import React from 'react'

export default function NavbarForHome() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">PathFiner</a>
                <div className="d-flex flex-row-reverse">
                    <button className="d-flex btn btn-outline-light">Sign Up</button>
                    <button className="d-flex btn btn-outline-light">Log In</button>
                </div>
            </div>
        </nav>
    )
}
