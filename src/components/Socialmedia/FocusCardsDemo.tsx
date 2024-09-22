import React from 'react'
import { FocusCards } from '../ui/focus-cards'

const FocusCardsDemo = ({postData}) => {
  if (!postData || postData.length == 0) {
    return <div className='h-screen text-center text-gray-500 font-roboto text-xl'>No post yet !!</div>; // Or render a loading spinner
  }

    return <FocusCards cards={postData} />;
}

export default FocusCardsDemo
