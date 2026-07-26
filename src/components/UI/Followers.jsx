import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Followers = ({followers}) => {
    const [count, setCount] = useState(followers)
    const [isDisabled, setIsDisabled] = useState(false)

    function changeFollowers(event) {
        event.preventDefault()
        setCount((prevCount) => prevCount + 1)
        setIsDisabled(true)
    }
  if (!isDisabled) {
  return (
    <>
    <div className="profile_follower">{followers} followers</div>
    <Link to="" className="btn-main" onClick={(event) =>changeFollowers(event)}>
        Follow
    </Link>
    </>
  )}
  if (isDisabled){
    return (
        <>
    <div className="profile_follower">{count} followers</div>
    <Link to="" className="btn-main" style={{cursor: 'not-allowed'}}>
        Unfollow
    </Link>
    </>
    )
  }
}

export default Followers