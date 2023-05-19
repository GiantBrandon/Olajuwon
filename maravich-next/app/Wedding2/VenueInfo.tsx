'use client'

import { Button, Link, Stack } from '@mui/material'
import React, { useRef } from 'react'

export const VenueInfo: React.FC = () => {
  const ref = useRef<HTMLDivElement>()
  
  return (
    <Stack direction='column' alignItems='center' gap={2} ref={ref}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3137.327888176753!2d-122.18072762449604!3d38.15581859011977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80850d56aac35681%3A0x916b0ee1c9c64977!2sHiddenbrooke%20Golf%20Club!5e0!3m2!1sen!2sus!4v1684124830861!5m2!1sen!2sus"
        width={ref.current?.clientWidth}
        height={ref.current?.clientHeight}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <Button size='large' variant='contained' endIcon={<Link />} href='https://www.wedgewoodweddings.com/hiddenbrookehills'>View Website</Button>
    </Stack>
  )
}
