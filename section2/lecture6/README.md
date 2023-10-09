# process

# 12. process

- 현재 실행중인 프로세스를 명령어를 통해 알 수 있음.
- 참고하기

# 13. process.env

- 시스템 환경 변수들이 들어있는 객체
- 항상 비밀 키는 process.env → 환경변수를 활용하여 비밀 키를 숨기기
- 메모리 늘리는 코드도 있음 → NODE_OPTION=—max-old-space-size=8192

# 14. process.nextTick(콜백)

- Promise, nextTick()은 새치기 하는 친구들이다.
- 백그라운드에서 테스크 큐로 넘어가지만 promise, nextTick() 은 새치기 합니다.
- 무조건 node에서는 setTimeout은 쓰지말자 immediated를 사용하자

# 15. process.exit

- 서버를 끌 때 process.exit(0)
- process.exit(1) → 에러를 알리고 끄기.