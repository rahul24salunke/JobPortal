import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';

const catogory = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Ai Engineer",
  "Data Base administrater"
]


const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searachHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }
  return (
    <div>
      <Carousel className={"w-full max-w-xl mx-auto my-20"}>
        <CarouselContent>
          {
            catogory.map((cat, i) => <CarouselItem onClick={() => searachHandler(cat)} key={i} className={"md:basis-1/3 lg-basis-1/3"}><Button variant={"outline"} className={"rounded-full"}>{cat}</Button></CarouselItem>)
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel;
