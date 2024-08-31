import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { postdetails } from '../../../Interface/DatatypeInterface';
import Carousel from './Carousel';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import { likePost } from '../../../Api/User';
import errorHandle from '../../../Api/Error';
import { FaRegComment } from "react-icons/fa";
import AddComment from '../../Socialmedia/AddComment';


type ContentCardProps = {
  post: postdetails;
};

  const ContentCard: React.FC<ContentCardProps> = ({post}) => {
    const userData = useSelector((state: RootState) => state.user.userdata)
      
    const [isFollowed, setIsFollowed] = React.useState(false);
    const [liked,setLiked] = useState(post.likes?.includes(userData?._id as string)|| false)
    const [likeCount,setLikeCount] = useState(post.likeCount || 0)
    const handleLikeClick = async() => {
        try {
          
           const response = await likePost(post.id as string,userData?._id as string)
           if (response) {
            setLiked(!liked);
            setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
        }
        } catch (error) {
          errorHandle(error)
        }
      };
  return (
    <Card className="flex-none w-[320px] h-[400px] bg-black ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={post.user?.image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-sm font-semibold leading-none text-default-600">{post.user?.name}</h4>
            <h5 className="text-small tracking-tight text-default-400"></h5>
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
      <div>
      <Carousel>
  {post.images?.map((s, index) => (
    <img
      src={s}
      alt={`Carousel Image ${index}`}
      key={index}
      className="h-64 w-full object-contain flex justify-center items-center" // Ensures image is centered and fits within the container
    />
  ))}
</Carousel>
      </div>
      </CardBody>
      <div className=' display flex gap-2 px-2'>
        <p className='text-default-400 text-sm'>{post.description}</p>
      </div>

      <CardFooter className="gap-3">
        <div className="flex gap-1">
            <FaHeart   onClick={handleLikeClick}  className={`cursor-pointer transition-colors duration-300 ${liked ? 'text-red-500' : 'text-gray-500'}`}
            size={20} />
                      <p className="font-semibold text-default-400 text-small">{likeCount}</p>
          <p className=" text-default-400 text-small">Likes</p>
        </div>
        <div className="flex gap-1">
        {/* <FaRegComment className='text-default-400' size={20}/> */}
        <AddComment postId={post.id as string} />
          <p className="text-default-400 text-small">Comment</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ContentCard
