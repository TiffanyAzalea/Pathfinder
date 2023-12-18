import React from 'react';
import { Link} from "react-router-dom";

export default function UserHomePage() {
  return (
    <div>
        {/* <a className="btn btn-primary" href="#" role="button">Create Hike</a> */}
<Link className="btn btn-primary" to="/createhike">Create Hike2</Link>
<button className="btn btn-primary" type="submit">View Hike</button>
<button className="btn btn-primary" type="submit">Past Hikes</button>

{/* <input className="btn btn-primary" type="button" value="Input"></input>
<input className="btn btn-primary" type="submit" value="Submit"></input>
<input className="btn btn-primary" type="reset" value="Reset"></input> */}
    </div>

  )
}
