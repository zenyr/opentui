import { render } from "../src"

function App() {
  return (
    <text>
      CJK Character Rendering Test{"\n"}
      {"\n"}
      Korean: 한글 테스트 입니다{"\n"}
      Mixed: abc한글def{"\n"}
      {"\n"}
      Chinese: 这是中文测试{"\n"}
      Mixed: 12汉字34{"\n"}
      {"\n"}
      Japanese: 日本語テストです{"\n"}
      Mixed: text日本語text{"\n"}
      {"\n"}
      Complex: 한<span fg="red">글</span>테<span fg="green">스</span>트{"\n"}
      Background:{" "}
      <span bg="blue" fg="yellow">
        한글테스트
      </span>
      {"\n"}
      {"\n"}
      Bold CJK: <strong>한글굵게</strong>
      {"\n"}
      All together:{" "}
      <strong fg="cyan" bg="black">
        한글테스트
      </strong>
      {"\n"}
    </text>
  )
}

render(<App />)
