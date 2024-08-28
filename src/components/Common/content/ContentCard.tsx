import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';


const ContentCard = () => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const [liked,setLiked] = useState(false)

    const handleLikeClick = () => {
        setLiked(!liked);
      };
  return (
    <Card className=" w-[320px] h-[400px] bg-black ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 flex justify-center items-center ">
      <Image
      isBlurred
      style={{ height: '250px', width: '250px' }}

      src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
      alt="NextUI Album Cover"
      className="m-5"
    />
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
            <FaHeart   onClick={handleLikeClick}  className={`cursor-pointer transition-colors duration-300 ${liked ? 'text-red-500' : 'text-gray-500'}`}
            size={20} />
          <p className=" text-default-400 text-small">Likes</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ContentCard
