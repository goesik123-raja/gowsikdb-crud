import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Crudpage() {
    const [foodname, setfoodName] = useState("");
    const [description, setDescription] = useState("");
    const [foodList, setfoodList] = useState([]);
    const [newfoodName, setnewFoodName] = useState("");

    //  INSERT
    const addfoodData = () => {
        Axios.post("https://gowsikdb-crud.onrender.com/insert",{
            foodname,
            description,
        })
            .then(() => {
                fetchData(); // refresh
            })
            .catch((err) => console.log(err));
    };

    //  READ
    const fetchData = () => {
        Axios.get("https://gowsikdb-crud.onrender.com/read")
            .then((response) => {
                setfoodList(response.data);
            })
            .catch((err) => console.log(err));
    };

    //  UPDATE
    const updateFood = (id) => {
        Axios.put("https://gowsikdb-crud.onrender.com/update", {
            id,
            newfoodname: newfoodName,
        }).then(() => fetchData());
    };

    //  DELETE
    const deleteFood = (id) => {
        Axios.delete(`https://gowsikdb-crud.onrender.com/delete/${id}`)
            .then(() => fetchData())
            .catch((err) => console.log(err));
    };

    // auto load
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>This is CRUD Page</h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="food name"
                    onChange={(e) => setfoodName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="food description"onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <button className="btn btn-primary" onClick={addfoodData}> Add Food</button>
            </div>

            <h3>View Details</h3>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {foodList.map((val) => (
                        <tr key={val._id}>
                            <td>{val.foodname}</td>
                            <td>{val.description}</td>

                            <td>
                                <input type="text"placeholder="Update name"onChange={(e) => setnewFoodName(e.target.value)} />
                                <button className="btn btn-success"  onClick={() => updateFood(val._id)}> Edit</button>
                            </td>

                            <td>
                                <button className="btn btn-danger"onClick={() => deleteFood(val._id)}>Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Crudpage;