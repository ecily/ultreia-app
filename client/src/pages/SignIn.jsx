import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  //nicht mehr notwendig wegen redux
  //const [error, setError] = useState(null)
  //const [loading, setLoading] = useState(false)
  //stattdessen
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    //verhindert ein refresh beim klick
    e.preventDefault()

    try {
    //setloading nicht mehr notwendig, wegen redux
    //setLoading(true)
    dispatch(signInStart())
    //fetch method für die api route
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    //data.success aus der backend index.js middleware
    if (data.success === false) {
      //nicht mehr notwendig wegen redux
      //setError(data.message)
      //setLoading(false)
      dispatch(signInFailure(data.message))
      return
    }
    //nicht mehr notwenig wegen redux
    //setLoading(false)
    //setError(null)
    dispatch(signInSuccess(data))
    navigate("/")
  } catch (error) {
    //nicht mehr notwendig wegen redux
    //setLoading(false)
    //setError(error.message)
    dispatch(signInFailure(error.message))
  }
    //console.log(data)
  }
  //in der Browser-Konsole die Änderungen anzeigen
  //console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            className="border p-3 rounded-lg"
            type="email" 
            placeholder="email" 
            id="email"
            onChange={handleChange}/>
          <input 
            className="border p-3 rounded-lg"
            type="password" 
            placeholder="password" 
            id="password"
            onChange={handleChange}/>
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            { loading ? "Loading ..." : "Sign In"}
          </button>
          <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">
          Dont have an account? </p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

