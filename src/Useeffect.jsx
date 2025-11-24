import { useEffect, useState } from 'react'
// import './App.css'


const Timer = () => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 돌아가는 중...')
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log('타이머종료')
        }
    });
    return (
        <>
            <p>타이머 시작!</p>
        </>
    )
}

function UseEffect() {

    // useEffect란 

    // 1. 화면이 랜더링 될 때 마다 같이 실행됨
    useEffect(() => {
        console.log('hello')
    }, []);


    // 2.리스트 추가 될 떄만 실행한다
    // 3. 첫 실행 했을 때만 useffect실행

    const [showTimer, setShowTimer] = useState(false);
    return (

        //shoTimer가 true일때만 <Timer/>를 보여준다
        <div>
            {showTimer && <Timer />}
            <button onClick={() => setShowTimer(!showTimer)}>토글버튼</button>
        </div>
    )
}

export default UseEffect
