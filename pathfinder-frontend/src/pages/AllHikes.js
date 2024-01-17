import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import NavbarBS from '../layout/NavbarBS';

export default function AllHikes() {
    const [allhikes, setAllHikes] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        loadAllHikes();
    }, []);

    const loadAllHikes = async () => {
        const result = await axios.get("http://localhost:8080/allhikes");
        setAllHikes(result.data);
    }


    useEffect(() => {
        loadAllHikes()
    }, [])
    const { id } = useParams();


    const deletehike = async (id) => {
        await axios.delete(`http://localhost:8080/deletehike/${id}`)
        loadAllHikes();
    }
    const edithike = async (id) => {
        await axios.put(`http://localhost:8080/edithike/${id}`)
        loadAllHikes();
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:8080/allhikes");
        navigate("/createhike");
    };
    return (
        <section className='section'>
            <div >
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
                                    <td>
                                        <Link className="btn btn-primary mx2" to={`/viewhike/${hike.id}`}>View</Link>
                                        <button to='/allhikes' className='btn btn-danger mx2' onClick={() => deletehike(hike.id)}>Cancel</button>

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
