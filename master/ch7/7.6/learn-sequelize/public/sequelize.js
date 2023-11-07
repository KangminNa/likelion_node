// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function () {
    const id = el.querySelector('td').textContent;
    getComment(id); // 사용자의 ID를 사용하여 댓글을 가져오는 함수 호출
  });
});

// 사용자 로딩
async function getUser() {
  try {
    const res = await axios.get('/users'); // 서버로부터 사용자 목록을 가져옵니다.
    const users = res.data; // 가져온 사용자 목록을 저장합니다.
    console.log(users);
    const tbody = document.querySelector('#user-list tbody'); // 사용자 목록을 표시할 테이블의 tbody 요소를 찾습니다.
    tbody.innerHTML = ''; // tbody를 비웁니다.

    users.map(function (user) {
      const row = document.createElement('tr'); // 사용자 정보를 표시할 새로운 행을 생성합니다.
      row.addEventListener('click', () => {
        getComment(user.id); // 사용자 이름을 클릭하면 해당 사용자의 댓글을 가져오는 함수를 호출합니다.
      });

      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = user.id; // 사용자 ID를 표시합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.name; // 사용자 이름을 표시합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.age; // 사용자 나이를 표시합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.married ? '기혼' : '미혼'; // 사용자의 결혼 상태를 표시합니다.
      row.appendChild(td);
      tbody.appendChild(row); // 행을 tbody에 추가합니다.
    });
  } catch (err) {
    console.error(err); // 오류 발생 시 에러를 콘솔에 출력합니다.
  }
}

// 댓글 로딩
async function getComment(id) {
  try {
    const res = await axios.get(`/users/${id}/comments`); // 특정 사용자의 댓글을 가져옵니다.
    const comments = res.data; // 가져온 댓글 목록을 저장합니다.
    const tbody = document.querySelector('#comment-list tbody'); // 댓글 목록을 표시할 테이블의 tbody 요소를 찾습니다.
    tbody.innerHTML = ''; // tbody를 비웁니다.

    comments.map(function (comment) {
      // 로우 셀 추가
      const row = document.createElement('tr'); // 댓글 정보를 표시할 새로운 행을 생성합니다.
      let td = document.createElement('td');
      td.textContent = comment.id; // 댓글 ID를 표시합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.User.name; // 댓글 작성자의 이름을 표시합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = comment.comment; // 댓글 내용을 표시합니다.

      row.appendChild(td);
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => {
        // 수정 버튼을 클릭하면 댓글을 수정하는 함수를 호출합니다.
        const newComment = prompt('바꿀 내용을 입력하세요');
        if (!newComment) {
          return alert('내용을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.patch(`/comments/${comment.id}`, { comment: newComment }); // 서버에 댓글 수정 요청을 보냅니다.
          getComment(id); // 수정 후 댓글을 다시 불러옵니다.
        } catch (err) {
          console.error(err);
        }
      });

      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => {
        // 삭제 버튼을 클릭하면 댓글을 삭제하는 함수를 호출합니다.
        try {
          await axios.delete(`/comments/${comment.id}`); // 서버에 댓글 삭제 요청을 보냅니다.
          getComment(id); // 삭제 후 댓글을 다시 불러옵니다.
        } catch (err) {
          console.error(err);
        }
      });

      // 버튼 추가
      td = document.createElement('td');
      td.appendChild(edit); // 수정 버튼을 추가합니다.
      row.appendChild(td);
      td = document.createElement('td');
      td.appendChild(remove); // 삭제 버튼을 추가합니다.
      row.appendChild(td);
      tbody.appendChild(row); // 행을 tbody에 추가합니다.
    });
  } catch (err) {
    console.error(err); // 오류 발생 시 에러를 콘솔에 출력합니다.
  }
}

// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작을 막습니다.
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;

  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!age) {
    return alert('나이를 입력하세요');
  }

  try {
    await axios.post('/users', { name, age, married }); // 새 사용자를 서버에 등록합니다.
    getUser(); // 등록 후 사용자 목록을 다시 불러옵니다.
  } catch (err) {
    console.error(err); // 오류 발생 시 에러를 콘솔에 출력합니다.
  }

  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});

// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작을 막습니다.
  const id = e.target.userid.value;
  const comment = e.target.comment.value;

  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!comment) {
    return alert('댓글을 입력하세요');
  }

  try {
    await axios.post('/comments', { id, comment }); // 새 댓글을 서버에 등록합니다.
    getComment(id); // 등록 후 댓글 목록을 다시 불러옵니다.
  } catch (err) {
    console.error(err); // 오류 발생 시 에러를 콘솔에 출력합니다.
  }

  e.target.userid.value = '';
  e.target.comment.value = '';
});
