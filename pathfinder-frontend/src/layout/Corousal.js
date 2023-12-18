import React from 'react'

export default function Corousal() {
  return (
    <div>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {/* <div className="carousel-item active">
      <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/health/wp-content/uploads/2023/07/hiking-apps.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://images.theconversation.com/files/405661/original/file-20210610-18-imwshy.jpg?ixlib=rb-1.1.0&rect=6%2C0%2C4486%2C2997&q=45&auto=format&w=926&fit=clip" className="d-block w-10" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/10/15/09/istock-483629308.jpg?quality=75&width=990&crop=3%3A2%2Csmart&auto=webp" className="d-block w-100" alt="..."/>
    </div> */}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>        
    </div>
  )
}
