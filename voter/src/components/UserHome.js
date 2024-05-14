import React from 'react'
import '../css/userHome.css'
import { Typography ,Button} from '@mui/material'
import { Link } from 'react-router-dom'
const UserHome = () => {
  return (
  <div className='h-screen flex justify-between flex-wrap-reverse'>
    <div className='userHome w-full h-1/2 md:h-full md:w-1/2'></div>
    <div className='w-full h-1/2 md:h-full md:w-1/2 text-black flex justify-center items-center flex-col '>
      <Typography variant="h4" align='center1'>Be a Part of Decision</Typography>
      <Typography variant="h2" align='center' fontWeight={800}>Vote today</Typography>
      <div className='flex justify-center gap-3 pt-5'>
        <Button
          size='medium'
          color='secondary'
          variant='contained'
          sx={{width:"50%"}}
          component={Link}
          to="/user/register"
        >Register</Button>
        <Button
          size='medium'
          color='primary'
          variant='contained'
          sx={{width:"50%"}}
          component={Link}
          to="/user/signin"
        >Signin</Button>
      </div>
    </div>
  
      
    </div>
  )
}

export default UserHome
