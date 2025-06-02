import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numbertake,setNumbertake] = useState(false)
  const [chrtake,setChrtake] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const generatePassword = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbertake) str += "0123456789"
    if(chrtake) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length+1)
      pass +=str.charAt(randomIndex)
      
    }
    setPassword(pass)
  },[length,numbertake,chrtake,setPassword])
  useEffect(() => {
    generatePassword()
  }
  , [length, numbertake, chrtake, generatePassword])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-2xl px-5 py-3 my-60 text-orange-500 bg-gray-600'>
        <h1 className='text-2xl font-bold rounded-lg text-white text-center mb-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-black">
          <input
            type="text"
            value={password}
            className='w-full px-3 py-1 outline-none bg-white'
            placeholder='Generate Your Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className='outline-none px-3 py-.5 bg-blue-700 text-white shrink-0 font-semibold' >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 text-white'>
            <input
              type='range'
              min={8}
              max={100}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 px-2 text-white'>
            <input
              type='checkbox'
              defaultChecked={numbertake}
              id='numberInput'
              onChange={() => setNumbertake((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 px-2 text-white'>
            <input
              type='checkbox'
              defaultChecked={chrtake}
              id='charInput'
              onChange={() => {setChrtake((prev) => !prev)}}
            />
            <label>Special Characters</label>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
