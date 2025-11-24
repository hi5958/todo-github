import { useState } from 'react'
// import './App.css'


function TodoInput({ onAdd }) {
    const [newText, setNewText] = useState("");

    function addNewText() {
        // trim() 
        if (newText.trim() === "") {
            return setNewText("")
        }
        onAdd(newText);
        setNewText("")
    }

    // enter키 이벤트 처리
    function keyDown(e) {
        if (e.key === 'Enter') {
            addNewText()

            //이벤트키가 enter를 키면 addNewText() 함수 호출
        }
    }

    return (
        <div>
            <h2 className='list-title'>할일 추가</h2>
            <div className='input-wrap'>
                <input type="text" placeholder='할일을 입력해주세요' value={newText} onChange={(e) => setNewText(e.target.value)} className='input-add' onKeyDown={keyDown} />
                <button onClick={addNewText} className='btn'>추가</button>
            </div>
        </div>
    )

}

export default TodoInput
