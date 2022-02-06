import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBInput } from 'mdbreact'

const MainScreen = () => {

    const [user, setUser] = useState(null)

    const [fname, setfname] = useState(null)
    const [lname, setLname] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [country, setCountry] = useState(null)
    const [postCode, setPostCode] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [gender, toggleGender] = useState(null)

    useEffect(() => {
        axios.get("https://randomuser.me/api/")
            .then(data => {
                // console.log(data.data)
                setUser(data.data.results[0])
                setfname(data.data.results[0].name.first)
                setLname(data.data.results[0].name.last)
                setCity(data.data.results[0].location.city)
                setState(data.data.results[0].location.state)
                setCountry(data.data.results[0].location.country)
                setPostCode(data.data.results[0].location.postcode)
                setEmail(data.data.results[0].email)
                setPhone(data.data.results[0].phone)
                toggleGender(data.data.results[0].gender)
            })
            .catch(error => {
                alert("some error has happened! please try again later ...")
                console.log(error)
            })
    }, [])

    const toggleGender_ = () => {
        if (gender == 'male') {
            toggleGender('female')
        } else {
            toggleGender('male')
        }
        updateInfo()
    }

    const updateInfo = () => {

        axios.post("https://postman-echo.com/post" ,{
            "first_name": fname,
            "last_name": lname,
            "city": city,
            "state": state,
            "country": country,
            "postcode": postCode,
            "email": email,
            "phone": phone,
            "gender": gender
        } , {
            headers : {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' // did not work
              },
              crossdomain: true
        }).then(data => {
            console.log(data.data)
        }).catch(error => {
            // alert("Failed to update user's information! Please try later ...")
            console.log(error)
        })
    }

    return (
        <div className='wrapper'>
            {
                user != null ? (
                    <div className='edit_card'>
                        <div className='cardHeader'>
                            <div style={{ flex: 1 }}>
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div style={{ flex: 5, textAlign: "center", fontWeight: "bold" }}>
                                <h5>Profile</h5>
                            </div>
                            <div style={{ flex: 1 }}>
                                <img src={user.picture.medium} className="profileAvatar" />
                            </div>
                        </div>
                        <div className='cardBody'>
                            <h4>Edit</h4>
                            <div className='detailRow'>
                                <div className='detailLabel'>Picture</div>
                                <div className='detailValue'>
                                    <img src={user.picture.medium} className="profileAvatar" />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>First Name</div>
                                <div className='detailValue'>
                                    <MDBInput value={fname} onChange={(e) => { setfname(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Last Name</div>
                                <div className='detailValue'>
                                    <MDBInput value={lname} onChange={(e) => { setLname(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>City</div>
                                <div className='detailValue'>
                                    <MDBInput value={city} onChange={(e) => { setCity(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>State</div>
                                <div className='detailValue'>
                                    <MDBInput value={state} onChange={(e) => { setState(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Country</div>
                                <div className='detailValue'>
                                    <MDBInput value={country} onChange={(e) => { setCountry(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Post Code</div>
                                <div className='detailValue'>
                                    <MDBInput value={postCode} onChange={(e) => { setPostCode(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Email</div>
                                <div className='detailValue'>
                                    <MDBInput value={email} onChange={(e) => { setEmail(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Phone</div>
                                <div className='detailValue'>
                                    <MDBInput value={phone} onChange={(e) => { setPhone(e.target.value); updateInfo() }} />
                                </div>
                            </div>
                            <div className='detailRow'>
                                <div className='detailLabel'>Gender</div>
                                <div className='detailValue'>
                                    <div className='custom-control custom-switch'>
                                        <input
                                            type='checkbox'
                                            className='custom-control-input'
                                            id='customSwitches'
                                            checked={gender == 'male'}
                                            onChange={toggleGender_}
                                        />
                                        <label className='custom-control-label' htmlFor='customSwitches'>
                                            {gender == 'male' ? "Male" : "Female"}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )
            }
        </div>
    )
}

export default MainScreen