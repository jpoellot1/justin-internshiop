import React, {useState, useEffect} from 'react'

const CountdownTimer = ({expiryDate}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        if(!expiryDate) return null;

        const millisLeft = expiryDate - Date.now()
        if (millisLeft <= 0) return null;

        const secondsLeft = Math.floor(millisLeft / 1000)
        const minutes = Math.floor((secondsLeft % 3600) /60)
        const hours = Math.floor(secondsLeft / 3600)
        const seconds = secondsLeft % 60

        return {hours, minutes, seconds}
       }

       useEffect(() => {
        if(!expiryDate || expiryDate - Date.now() <= 0) return;

        const timer = setInterval(() => {
            const remainingTime =calculateTimeLeft();
            setTimeLeft(remainingTime)
            
            if(!remainingTime) {
                clearInterval(timer)
            }
        } , 1000)
        return() => clearInterval(timer)
       }, [expiryDate])

    if(!expiryDate) {
        return <></>
    }
    else if (!timeLeft) {
        return <div className="de_countdown">EXPIRED</div>
    }
    else {
        return <div className="de_countdown">{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
    }
}

export default CountdownTimer