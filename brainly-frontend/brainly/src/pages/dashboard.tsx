import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { Greeting } from '../components/ui/Greeting'

function DashBoard() {

  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])
  
  return (
    <>
    <div>
      <SideBar/>       
    </div>    
    <div>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
          }}/>
        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2 '>
          <div className='flex justify-end gap-4 pb-3'>
            <Button variant={'primary'}startIcon={<PlusIcon/>} text={'Add content'} size='md' onClick={() => {setModalOpen(true)}}></Button>
            <Button variant={'secondary'} startIcon={<ShareIcon/>} text={'Share brain'} size='md' onClick={async() => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem('token')
                }
            })
              const sharedUrl = `http://localhost:3000/api/v1/brain/share/${response.data.hash}`;
              alert(sharedUrl);
            }}></Button>
          </div>
          <div className='flex gap-4 flex-wrap'>
            {contents.map(({type, link, title}) => <Card 
              type={type} 
              link={link} 
              title={title} 
            />)}
          </div>
          <div className='align-center'>
            {contents.length === 0 && <Greeting/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard;
