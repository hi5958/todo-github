import { useState, useEffect } from 'react'
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import './App.css'


function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {

    // localStorage에 'todos'란 이름으로 저장된게 있는지 확인하기
    const saved = localStorage.getItem("todos");

    if (saved) {
      // JSON 문자열을 다시 객체 또는 배열로 변환해서 반환하기
      return JSON.parse(saved)
    }

    // 없으면 빈 배열 변환
    return []
  });

  //todos 상태가 바뀔때마다 localStrorage에 저장
  useEffect(() => {
    // 원래 배열/객체를 문자열로 바꿔서 저장
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  function addTodo(newTodo) {
    setTodos([
      ...todos,
      {
        // UUID 겹치지 않는 고유한 아이디를 만들때 사용함
        id: crypto.randomUUID(), //345345-645465-23346-d662
        text: newTodo,
        done: false,
        isEditing: false
      }
    ]);
    // 새 항목 추가 시 완료상태는 false(미완료)
  }

  // 수정모드 전환함수 (수정버튼 클릭시)

  function toggleEdit(id) {
    const editTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: !item.isEditing }
      }
      return item;
    });
    setTodos(editTodos)
  }

  // 수정완료함수(저장버튼 클릭 시 발생되는 이벤트)


  function updateTodo(id, newText) {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newText,
          isEditing: false
          //텍스트 변경 + isEditing false로 변경
        }
      }
      return item;
    })
    setTodos(updateTodos)
  }




  // 할일 완료 상태 (체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done }//원래 내용은 그대로 두고 done 속성만 반대로 바꿔줌
      }
      return item;
    });

    setTodos(newTodos) //새 배열로 상태 업데이트

  }

  // 할일삭제함수
  // function deleteTodo(deleteIndex) {
  //   const newTodos = [...todos] //기존 배열을 그대로 복사
  //   newTodos.splice(deleteIndex, 1)//클릭한 deleteIndex 1개 삭제한다
  //   setTodos(newTodos)//새 배열로 상태 업데이트
  // }

  // filter 함수로 변경
  // filter: 배열을 하나씩 훑으면서 조건에 맞는 것만 새 배열로 반환
  function deleteTodo(id) {

    // const newTodos = todos.filter((item, index) => index !== deleteIndex)

    // 한줄로 쓰면
    // 이 자리에 값(item)이 있지만 우리는 안쓸것이다
    // 즉 값(item)은 필요가 없고 위치(index)만 필요할떄

    // setTodos(todos.filter((item, index) => index !== deleteIndex));


    // index -> id 로 변경하면
    setTodos(todos.filter((item) => item.id !== id));

  }

  return (

    <div className='app'>
      <h1 className='title'>Todo List</h1>
      <div className='contents'>

        {/* 인풋 추가 영역  */}
        <TodoInput onAdd={addTodo} />

        {/* 목록 영역  */}
        <TodoList todos={todos} Delete={deleteTodo} onToggle={toggleTodo} onEdit={toggleEdit} onUpdate={updateTodo} />
      </div>

    </div>
  )
}

export default App

// text:할일내용 done 완료여부

//로컬스토리지란? 웹 브라우저에 데이터를 저장하는 공간이고 
// 브라우저를 닫아도 데이터를 유지해준다 
//용량제한 있긴한다
