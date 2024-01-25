import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import Search from '../components/Search';


export default function HikesList() {
    const [data,setData]= useState([]);
    const [allhikes, setAllHikes] = useState([]);
    
  
    useEffect(() => {
        loadAllHikes();
    }, []);

    const loadAllHikes = async () => {
        const result = await axios.get("http://localhost:8080/allhikes");
        setAllHikes(result.data);
    }

    useEffect (()=> {
        
        axios.get ('http://localhost:3000/hikeslist')
        .then(res => setData(res.data))
        .catch(er => console.log(er));
        }, []);
    useEffect(() => {
        loadAllHikes()
    }, [])
    const { id } = useParams();


    const deletehike = async (id) => {
        await axios.delete(`http://localhost:8080/deletehike/${id}`)
        loadAllHikes();
    }
   
    
    return (
        <section className='section'>
            <div >
            
            <Link className="btn btn-primary mx2" to={`/createhike`}>Create Hike</Link>
                <div className='py-4'>
                    <h1 align="center">Saved Hikes</h1>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">Trail Name</th>
                                <th scope="col">Area Name</th>
                                <th scope="col">Walkable</th>
                                <th scope="col">Bike Friendly</th>
                                <th scope="col">Distance</th>
                                <th scope="col">Date</th>
                               <th scope="col">Image</th>
                                
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allhikes.map((hike, index) => (
                                
                                
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{hike.trailName}</td>
                                    <td>{hike.areaName}</td>
                                    <td>{hike.walkable}</td>
                                    <td>{hike.bikeFriendly}</td>
                                    <td>{hike.distance}</td>
                                    <td>{hike.date}</td>
                                    
                                    <td><Link className="btn btn-primary mx-1" to={`/imageupload`}>Upload</Link>
</td>
                                    
                                    <td>
                                    <Link className="btn btn-warning mx-1" to={`/edithike/${hike.id}`}>Edit</Link>

                                       {/* <button className='btn btn-warning mx2' to={`/edithike/${hike.id}`}>Edit</button>*/}

                                        <Link className="btn btn-info mx-1" to={`/viewhike/${hike.id}`}>View</Link>
                                        <button to='/allhikes' className='btn btn-danger mx-1' onClick={() => deletehike(hike.id)}>Delete</button>
                                        <Link className="btn btn-primary mx-1" to={`/userHomePage`}>Back</Link>
                                    </td>
                                </tr>
                            ))}


                        </tbody>

                    </table>
                </div>
            </div>
        </section>
    )
}
